package com.LMS.demo.service;

import com.LMS.demo.dto.EmployeeRequestDTO;
import com.LMS.demo.dto.EmployeeResponseDTO;

import java.util.List;

public interface EmployeeService {

    EmployeeResponseDTO getProfile(Long id);

    List<EmployeeResponseDTO> getAllEmployees();

    EmployeeResponseDTO createEmployee(
            EmployeeRequestDTO request,Long managerId
    );

    EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO request
    );

}