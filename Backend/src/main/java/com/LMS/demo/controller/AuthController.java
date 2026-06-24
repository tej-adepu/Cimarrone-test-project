package com.LMS.demo.controller;

import com.LMS.demo.dto.LoginRequestDTO;
import com.LMS.demo.dto.LoginResponseDTO;
import com.LMS.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody LoginRequestDTO request
    ) {

        return authService.login(
                request
        );
    }
}