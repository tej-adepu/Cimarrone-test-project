
package com.LMS.demo.security;

import com.LMS.demo.entity.Employee;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mySuperSecretJwtKeyForLeaveManagementSystem123456789";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes()
            );

    public String generateToken(
            Employee employee
    ) {

        Map<String, Object> claims =
                new HashMap<>();

        claims.put(
                "id",
                employee.getId()
        );

        claims.put(
                "name",
                employee.getName()
        );

        claims.put(
                "email",
                employee.getEmail()
        );

        claims.put(
                "department",
                employee.getDepartment()
        );

        claims.put(
                "role",
                employee.getRole().name()
        );

        claims.put(
                "managerId",
                employee.getManagerId()
        );

        return Jwts.builder()
                .claims(claims)
                .subject(employee.getEmail())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000L * 60 * 60 * 24
                        )
                )
                .signWith(key)
                .compact();
    }

    public String extractEmail(
            String token
    ) {

        return extractAllClaims(token)
                .getSubject();
    }

    public String extractRole(
            String token
    ) {

        return extractAllClaims(token)
                .get("role", String.class);
    }

    public Long extractUserId(
            String token
    ) {

        return extractAllClaims(token)
                .get("id", Long.class);
    }

    public boolean isTokenValid(
            String token,
            String email
    ) {

        return email.equals(
                extractEmail(token)
        ) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(
            String token
    ) {

        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}