package com.LMS.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String department;

    private String role;

    private Long managerId;

    private String token;
}