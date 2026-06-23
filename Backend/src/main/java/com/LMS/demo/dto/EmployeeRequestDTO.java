package com.LMS.demo.dto;

import com.LMS.demo.entity.enums.Role;
import lombok.Data;

@Data
public class EmployeeRequestDTO {

    private String name;

    private String email;

    private String password;

    private String department;

    private Double salary;

    private Role role;

    private Long managerId;
}