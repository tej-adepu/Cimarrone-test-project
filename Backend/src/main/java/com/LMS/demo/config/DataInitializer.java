package com.LMS.demo.config;

import com.LMS.demo.entity.Employee;
import com.LMS.demo.entity.enums.Role;
import com.LMS.demo.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if(employeeRepository.existsByEmail(
                "admin@gmail.com"
        )){
            return;
        }

        Employee admin = Employee.builder()
                .name("Admin")
                .email("admin@gmail.com")
                .password(
                        passwordEncoder.encode(
                                "cimarrone@123"
                        )
                )
                .salary(0.0)
                .department("NONE")
                .role(Role.MANAGER)
                .managerId(null)
                .build();

        employeeRepository.save(admin);

        System.out.println(
                "Default manager account created."
        );
    }
}