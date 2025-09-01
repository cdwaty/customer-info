package com.example.customerinfo.controller;

import com.example.customerinfo.model.Customer;
import com.example.customerinfo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id)
                .map(customer -> ResponseEntity.ok().body(customer))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        return customerRepository.save(customer);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customer.setFirstName(customerDetails.getFirstName());
                    customer.setLastName(customerDetails.getLastName());
                    customer.setDateOfBirth(customerDetails.getDateOfBirth());
                    customer.setStreetAddress(customerDetails.getStreetAddress());
                    customer.setSuburb(customerDetails.getSuburb());
                    customer.setCity(customerDetails.getCity());
                    customer.setPostCode(customerDetails.getPostCode());
                    customer.setPhoneNumber(customerDetails.getPhoneNumber());
                    customer.setEmail(customerDetails.getEmail());
                    customer.setUpdatedAt(LocalDateTime.now());
                    return ResponseEntity.ok(customerRepository.save(customer));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customerRepository.delete(customer);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}