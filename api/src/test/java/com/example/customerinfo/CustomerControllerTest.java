package com.example.customerinfo;

import com.example.customerinfo.controller.CustomerController;
import com.example.customerinfo.model.Customer;
import com.example.customerinfo.repository.CustomerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CustomerController.class)
class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerRepository customerRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllCustomers_ReturnsCustomerList() throws Exception {
        Customer customer = createTestCustomer();
        when(customerRepository.findAll()).thenReturn(Arrays.asList(customer));

        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("John"))
                .andExpect(jsonPath("$[0].email").value("john@test.com"));
    }

    @Test
    void getCustomerById_ExistingId_ReturnsCustomer() throws Exception {
        Customer customer = createTestCustomer();
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));

        mockMvc.perform(get("/api/customers/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    void getCustomerById_NonExistingId_ReturnsNotFound() throws Exception {
        when(customerRepository.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/customers/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createCustomer_ValidData_ReturnsCreatedCustomer() throws Exception {
        Customer customer = createTestCustomer();
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        mockMvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    void updateCustomer_ExistingId_ReturnsUpdatedCustomer() throws Exception {
        Customer existingCustomer = createTestCustomer();
        Customer updatedCustomer = createTestCustomer();
        updatedCustomer.setFirstName("Jane");

        when(customerRepository.findById(1L)).thenReturn(Optional.of(existingCustomer));
        when(customerRepository.save(any(Customer.class))).thenReturn(updatedCustomer);

        mockMvc.perform(put("/api/customers/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedCustomer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Jane"));
    }

    @Test
    void updateCustomer_NonExistingId_ReturnsNotFound() throws Exception {
        Customer customer = createTestCustomer();
        when(customerRepository.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/customers/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteCustomer_ExistingId_ReturnsOk() throws Exception {
        Customer customer = createTestCustomer();
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));

        mockMvc.perform(delete("/api/customers/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteCustomer_NonExistingId_ReturnsNotFound() throws Exception {
        when(customerRepository.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/customers/1"))
                .andExpect(status().isNotFound());
    }

    private Customer createTestCustomer() {
        Customer customer = new Customer();
        customer.setId(1L);
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setDateOfBirth(LocalDate.of(1990, 1, 1));
        customer.setStreetAddress("123 Test St");
        customer.setCity("Test City");
        customer.setPostCode("12345");
        customer.setPhoneNumber("555-1234");
        customer.setEmail("john@test.com");
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        return customer;
    }
}