package com.LMS.demo.repository;

import com.LMS.demo.entity.LeaveRecord;
import com.LMS.demo.entity.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRecordRepository extends JpaRepository<LeaveRecord, Long> {

    List<LeaveRecord> findByEmployeeId(Long employeeId);

    List<LeaveRecord> findByStatus(LeaveStatus status);

    List<LeaveRecord> findByEmployeeIdAndStatus(
            Long employeeId,
            LeaveStatus status
    );
}