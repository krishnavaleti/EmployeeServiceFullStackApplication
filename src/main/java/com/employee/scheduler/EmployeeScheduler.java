package com.employee.scheduler;


import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmployeeScheduler {
	
    private static final Logger logger = LoggerFactory.getLogger(EmployeeScheduler.class);

    @Autowired
    private EmployeeRepository repository;

    @Scheduled(fixedRate = 30000) // 5 minutes in milliseconds
    public void updateTimestamps() {
    	logger.info("Scheduled task started at: {}", LocalDateTime.now());

        // Fetch all employees and update timestamps
        List<Employee> employees = repository.findAll();
        if (employees.isEmpty()) {
            logger.info("No employees to update.");
        } else {
            employees.forEach(employee -> {
                employee.setTimestamp(LocalDateTime.now());
            });

            // Perform a batch update
            repository.saveAll(employees);  // Save all employees in one batch
            logger.info("{} employee timestamps updated.", employees.size());
        }

        logger.info("Scheduled task completed at: {}", LocalDateTime.now());
    }
}

