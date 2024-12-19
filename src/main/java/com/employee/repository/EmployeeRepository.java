package com.employee.repository;


import com.employee.model.Employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Page<Employee> findByNameContainingIgnoreCase(String name, PageRequest pageRequest);
}

