package com.LMS.demo.service.impl;

import com.LMS.demo.dto.LeaveApplyRequestDTO;
import com.LMS.demo.dto.LeaveBalanceDTO;
import com.LMS.demo.dto.LeaveResponseDTO;
import com.LMS.demo.entity.Employee;
import com.LMS.demo.entity.LeaveRecord;
import com.LMS.demo.entity.enums.LeaveStatus;
import com.LMS.demo.exception.ResourceNotFoundException;
import com.LMS.demo.repository.EmployeeRepository;
import com.LMS.demo.repository.LeaveRecordRepository;
import com.LMS.demo.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.LMS.demo.exception.BusinessException;
import com.LMS.demo.util.LeaveConstants;
import com.LMS.demo.util.LeaveUtils;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRecordRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveResponseDTO applyLeave(
            Long employeeId,
            LeaveApplyRequestDTO request
    ) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found"
                        ));

        LocalDate today = LocalDate.now();


        if (request.getStartDate().isBefore(today)) {
            throw new BusinessException(
                    "Cannot apply leave for past dates"
            );
        }

        if (request.getEndDate().isBefore(
                request.getStartDate())) {

            throw new BusinessException(
                    "End date cannot be before start date"
            );
        }

        List<LeaveRecord> approvedLeaves =
                leaveRepository
                        .findByEmployee_IdAndStatus(
                                employeeId,
                                LeaveStatus.APPROVED
                        );

        long totalApprovedDays =
                approvedLeaves.stream()
                        .mapToLong(leave ->
                                LeaveUtils.calculateWorkingDays(
                                        leave.getStartDate(),
                                        leave.getEndDate()
                                ))
                        .sum();

        long requestedDays =
                LeaveUtils.calculateWorkingDays(
                        request.getStartDate(),
                        request.getEndDate()
                );

        if (totalApprovedDays + requestedDays >
                LeaveConstants.MAX_APPROVED_LEAVES) {

            throw new BusinessException(
                    "Maximum leave limit exceeded. Remaining leave balance: "
                            + (LeaveConstants.MAX_APPROVED_LEAVES - totalApprovedDays)
            );
        }

        LeaveRecord leave = LeaveRecord.builder()
                .reason(request.getReason())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .appliedDate(today)
                .status(LeaveStatus.PENDING)
                .employee(employee)
                .build();

        LeaveRecord savedLeave =
                leaveRepository.save(leave);

        return mapToDTO(savedLeave);
    }


    @Override
    public LeaveResponseDTO cancelLeave(
            Long leaveId
    ) {

        LeaveRecord leave = leaveRepository
                .findById(leaveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Leave record not found"
                        ));

        leave.setStatus(
                LeaveStatus.CANCELLED
        );

        LeaveRecord updatedLeave =
                leaveRepository.save(leave);

        return mapToDTO(updatedLeave);
    }

    @Override
    public LeaveResponseDTO updateLeaveStatus(
            Long leaveId,
            LeaveStatus status
    ) {

        LeaveRecord leave = leaveRepository
                .findById(leaveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Leave record not found"
                        ));

        leave.setStatus(status);

        LeaveRecord updatedLeave =
                leaveRepository.save(leave);

        return mapToDTO(updatedLeave);
    }

    

    @Override
    public List<LeaveResponseDTO> getEmployeeLeaves(
            Long employeeId
    ) {

        employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found"
                        ));

        return leaveRepository
                .findByEmployeeId(employeeId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public LeaveBalanceDTO getLeaveBalance(
            Long employeeId
    ) {

        int currentYear =
                LocalDate.now().getYear();

        List<LeaveRecord> approvedLeaves =
                leaveRepository
                        .findByEmployee_IdAndStatus(
                                employeeId,
                                LeaveStatus.APPROVED
                        );

        long usedLeaves =
                approvedLeaves.stream()

                        .filter(leave ->
                                leave.getStartDate()
                                        .getYear()
                                        == currentYear
                        )

                        .mapToLong(leave ->
                                LeaveUtils
                                        .calculateWorkingDays(
                                                leave.getStartDate(),
                                                leave.getEndDate()
                                        )
                        )

                        .sum();

        long totalLeaves = 20;

        long remainingLeaves =
                totalLeaves - usedLeaves;

        return LeaveBalanceDTO.builder()
                .total(totalLeaves)
                .used(usedLeaves)
                .remaining(
                        Math.max(
                                remainingLeaves,
                                0
                        )
                )
                .build();
    }

    private LeaveResponseDTO mapToDTO(
            LeaveRecord leave
    ) {

        return LeaveResponseDTO.builder()
                .id(leave.getId())
                .reason(leave.getReason())
                .startDate(leave.getStartDate())
                .endDate(leave.getEndDate())
                .appliedDate(leave.getAppliedDate())
                .status(leave.getStatus())
                .days(
                        LeaveUtils.calculateWorkingDays(
                                leave.getStartDate(),
                                leave.getEndDate()
                        )
                )
                .employeeId(leave.getEmployee().getId())
                .employeeName(leave.getEmployee().getName())
                .department(leave.getEmployee().getDepartment())
                .build();
    }
}