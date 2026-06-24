package com.LMS.demo.service;

import com.LMS.demo.dto.LoginRequestDTO;
import com.LMS.demo.dto.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO login(
            LoginRequestDTO request
    );
}