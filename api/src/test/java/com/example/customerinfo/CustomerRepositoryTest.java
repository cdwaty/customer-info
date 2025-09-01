package com.example.customerinfo;

import com.example.customerinfo.model.Customer;
import com.example.customerinfo.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void saveCustomer_ValidData_SavesSuccessfully() {
        Customer customer = createTestCustomer();
        
        Customer saved = customerRepository.save(customer);
        
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getFirstName()).isEqualTo("John");
        assertThat(saved.getEmail()).isEqualTo("john@test.com");
    }

    @Test
    void findById_ExistingCustomer_ReturnsCustomer() {
        Customer customer = customerRepository.save(createTestCustomer());
        
        Optional<Customer> found = customerRepository.findById(customer.getId());
        
        assertThat(found).isPresent();
        assertThat(found.get().getFirstName()).isEqualTo("John");
    }

    @Test
    void findById_NonExistingCustomer_ReturnsEmpty() {
        Optional<Customer> found = customerRepository.findById(999L);
        
        assertThat(found).isEmpty();
    }

    @Test
    void deleteCustomer_ExistingCustomer_DeletesSuccessfully() {
        Customer customer = customerRepository.save(createTestCustomer());
        
        customerRepository.deleteById(customer.getId());
        
        Optional<Customer> found = customerRepository.findById(customer.getId());
        assertThat(found).isEmpty();
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