package com.LMS.demo.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveApplyRequestDTO {

    private String reason;

    private LocalDate startDate;

    private LocalDate endDate;
}