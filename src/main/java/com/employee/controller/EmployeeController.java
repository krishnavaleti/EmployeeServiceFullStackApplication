package com.employee.controller;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;
    
    @Autowired
    private KafkaTemplate<String, Employee> kafkaTemplate;

    private static final String TOPIC = "employee-topic";
    
 // Endpoint to publish employee details to Kafka
    @PostMapping("/publish")
    public ResponseEntity<String> publishEmployee(@RequestBody Employee employee) {
        kafkaTemplate.send(TOPIC, employee);
        return ResponseEntity.ok("Employee published to Kafka");
    }

 // Endpoint to fetch employees, with optional search and pagination
    @GetMapping
    public List<Employee> getEmployees(
            @RequestParam(defaultValue = "") String search,  // search query
            @RequestParam(defaultValue = "0") int page,     // page number
            @RequestParam(defaultValue = "10") int size      // page size
    ) {
        if (search.isEmpty()) {
            // If no search term, return all employees
            return repository.findAll();
        } else {
            // If search term is provided, return filtered employees based on search term
            return repository.findByNameContainingIgnoreCase(search, PageRequest.of(page, size)).getContent();
        }
    }
}
