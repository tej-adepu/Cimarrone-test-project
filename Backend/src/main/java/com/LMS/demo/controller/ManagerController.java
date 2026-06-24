package com.LMS.demo.controller;

import com.LMS.demo.dto.EmployeeRequestDTO;
import com.LMS.demo.dto.EmployeeResponseDTO;
import com.LMS.demo.dto.LeaveResponseDTO;
import com.LMS.demo.security.CustomUserPrincipal;
import com.LMS.demo.service.EmployeeService;
import com.LMS.demo.service.LeaveService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.LMS.demo.security.CustomUserPrincipal;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final EmployeeService employeeService;
    private final LeaveService leaveService;

    
    @GetMapping("/profile")
    public EmployeeResponseDTO getProfile(
            @AuthenticationPrincipal
            CustomUserPrincipal user
    ) {

        return employeeService.getProfile(
                user.getUserId()
        );
    }

    @GetMapping("/employees")
    public List<EmployeeResponseDTO> getEmployees(
            Authentication authentication
    ) {

        CustomUserPrincipal principal =
                (CustomUserPrincipal)
                        authentication.getPrincipal();

        return employeeService.getEmployeesByManager(
                principal.getUserId()
        );
    }

    @GetMapping("/employees/{id}/leaves")
    public List<LeaveResponseDTO> getEmployeeLeaves(
            @PathVariable Long id
    ) {
        return leaveService.getEmployeeLeaves(id);
    }

    @PostMapping("/employees")
    public EmployeeResponseDTO createEmployee(
            @AuthenticationPrincipal
            CustomUserPrincipal user,

            @RequestBody
            EmployeeRequestDTO request
    ) {

        return employeeService.createEmployee(
                request,
                user.getUserId()
        );
    }

    @PutMapping("/employees/{id}")
    public EmployeeResponseDTO updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeRequestDTO request
    ) {
        return employeeService.updateEmployee(id, request);
    }
}