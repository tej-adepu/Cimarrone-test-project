package com.LMS.demo.security;

import com.LMS.demo.entity.Employee;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserPrincipal
        implements UserDetails {

    private final Employee employee;

    public CustomUserPrincipal(
            Employee employee
    ) {
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority>
    getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" +
                        employee.getRole().name()
                )
        );
    }

    @Override
    public String getPassword() {

        return employee.getPassword();
    }

    @Override
    public String getUsername() {

        return employee.getEmail();
    }

    public Long getUserId() {

        return employee.getId();
    }

    public String getRole() {

        return employee.getRole().name();
    }

    public String getDepartment() {

        return employee.getDepartment();
    }

    public Long getManagerId() {

        return employee.getManagerId();
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}