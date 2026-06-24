package com.LMS.demo.service.impl;

import com.LMS.demo.dto.EmployeeRequestDTO;
import com.LMS.demo.dto.EmployeeResponseDTO;
import com.LMS.demo.entity.Employee;
import com.LMS.demo.exception.EmailAlreadyExistsException;
import com.LMS.demo.exception.ResourceNotFoundException;
import com.LMS.demo.repository.EmployeeRepository;
import com.LMS.demo.service.EmployeeService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public EmployeeResponseDTO getProfile(Long id) {

        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id " + id
                        ));

        return mapToDTO(employee);
    }

    @Override
    public List<EmployeeResponseDTO> getAllEmployees() {

        return employeeRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
public EmployeeResponseDTO createEmployee(
        EmployeeRequestDTO request,
        Long managerId
) {

    if (employeeRepository.existsByEmail(
            request.getEmail()
    )) {

        throw new EmailAlreadyExistsException(
                "Email already exists"
        );
    }

    Employee employee = Employee.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(
                    passwordEncoder.encode(
                            request.getPassword()
                    )
            )
            .department(request.getDepartment())
            .salary(request.getSalary())
            .role(request.getRole())

            // manager id from JWT
            .managerId(managerId)

            .build();

    Employee savedEmployee =
            employeeRepository.save(employee);

    return mapToDTO(savedEmployee);
}
    @Override
    public EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO request
    ) {

        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id " + id
                        ));

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());
        employee.setSalary(request.getSalary());
        employee.setRole(request.getRole());
        employee.setManagerId(request.getManagerId());

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToDTO(updatedEmployee);
    }

    private EmployeeResponseDTO mapToDTO(
            Employee employee
    ) {

        return EmployeeResponseDTO.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .salary(employee.getSalary())
                .role(employee.getRole())
                .managerId(employee.getManagerId())
                .build();
    }
}