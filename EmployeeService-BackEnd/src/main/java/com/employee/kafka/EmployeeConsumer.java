package com.employee.kafka;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmployeeConsumer {

    @Autowired
    private EmployeeRepository repository;

    @KafkaListener(topics = "employee-topic", groupId = "employee-group", containerFactory = "kafkaListenerContainerFactory")
    public void consumeEmployee(Employee employee) {
        employee.setTimestamp(LocalDateTime.now());
        repository.save(employee);
    }

}

