package com.LMS.demo.dto;

import com.LMS.demo.entity.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String department;

    private Double salary;

    private Role role;

    private Long managerId;
}