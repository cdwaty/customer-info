package com.example.customerinfo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
@Transactional
class CustomerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void fullCustomerLifecycle_CreateUpdateDelete_WorksCorrectly() throws Exception {
        Customer customer = createTestCustomer();

        // Create customer
        String response = mockMvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andReturn().getResponse().getContentAsString();

        Customer created = objectMapper.readValue(response, Customer.class);
        Long customerId = created.getId();

        // Get customer
        mockMvc.perform(get("/api/customers/" + customerId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"));

        // Update customer
        customer.setFirstName("Jane");
        mockMvc.perform(put("/api/customers/" + customerId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Jane"));

        // Delete customer
        mockMvc.perform(delete("/api/customers/" + customerId))
                .andExpect(status().isOk());

        // Verify deletion
        mockMvc.perform(get("/api/customers/" + customerId))
                .andExpect(status().isNotFound());
    }

    private Customer createTestCustomer() {
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setDateOfBirth(LocalDate.of(1990, 1, 1));
        customer.setStreetAddress("123 Test St");
        customer.setCity("Test City");
        customer.setPostCode("12345");
        customer.setPhoneNumber("555-1234");
        customer.setEmail("john@test.com");
        return customer;
    }
}