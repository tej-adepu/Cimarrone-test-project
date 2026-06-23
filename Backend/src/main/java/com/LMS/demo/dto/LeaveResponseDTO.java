package com.LMS.demo.dto;

import com.LMS.demo.entity.enums.LeaveStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class LeaveResponseDTO {

    private Long id;

    private String reason;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDate appliedDate;

    private LeaveStatus status;
}