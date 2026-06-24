package com.LMS.demo.service.impl;

import com.LMS.demo.dto.LoginRequestDTO;
import com.LMS.demo.dto.LoginResponseDTO;
import com.LMS.demo.entity.Employee;
import com.LMS.demo.repository.EmployeeRepository;
import com.LMS.demo.security.JwtService;
import com.LMS.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {

    private final EmployeeRepository employeeRepository;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginResponseDTO login(
            LoginRequestDTO request
    ) {

        Employee employee =
                employeeRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Invalid Email"
                                )
                        );
        
        if (!passwordEncoder.matches(
                request.getPassword(),
                employee.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        String token =
                jwtService.generateToken(
                        employee
                );


        System.out.println("ROLE = " + employee.getRole().name());
        System.out.println("TOKEN = " + token);

        return LoginResponseDTO
                .builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .role(
                        employee.getRole().name()
                )
                .managerId(
                        employee.getManagerId()
                )
                .token(token)
                .build();
    }
}