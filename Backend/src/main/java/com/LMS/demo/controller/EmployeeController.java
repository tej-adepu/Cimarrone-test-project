package com.LMS.demo.controller;

import com.LMS.demo.dto.EmployeeResponseDTO;
import com.LMS.demo.dto.LeaveApplyRequestDTO;
import com.LMS.demo.dto.LeaveResponseDTO;
import com.LMS.demo.security.CustomUserPrincipal;
import com.LMS.demo.service.EmployeeService;
import com.LMS.demo.service.LeaveService;
import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

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
    
    @GetMapping("/leave/history")
    public List<LeaveResponseDTO> getLeaveHistory(
            @AuthenticationPrincipal
            CustomUserPrincipal user
    ) {

        return leaveService.getEmployeeLeaves(
                user.getUserId()
        );
    }

    @PostMapping("/leave/apply")
    public LeaveResponseDTO applyLeave(
            @AuthenticationPrincipal
            CustomUserPrincipal user,

            @RequestBody
            LeaveApplyRequestDTO request
    ) {

        System.out.println("User = " + user);

        if(user != null){
            System.out.println("ID = " + user.getUserId());
            System.out.println("ROLE = " + user.getRole());
            System.out.println("AUTHORITIES = " + user.getAuthorities());
        }

        if(user == null){
            throw new RuntimeException("Unauthorized");
        }

        return leaveService.applyLeave(
                user.getUserId(),
                request
        );
    }

    @PutMapping("/leave/cancel/{id}")
    public LeaveResponseDTO cancelLeave(
            @PathVariable Long id
    ) {

        return leaveService.cancelLeave(id);
    }
}