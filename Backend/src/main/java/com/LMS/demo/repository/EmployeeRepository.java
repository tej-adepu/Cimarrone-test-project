package com.LMS.demo.repository;

import com.LMS.demo.entity.Employee;
import com.LMS.demo.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Employee> findByRole(Role role);

    List<Employee> findByManagerId(Long managerId);
}