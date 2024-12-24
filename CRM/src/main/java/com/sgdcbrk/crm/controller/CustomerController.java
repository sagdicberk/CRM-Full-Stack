package com.sgdcbrk.crm.controller;

import com.sgdcbrk.crm.business.abstracts.CustomerService;
import com.sgdcbrk.crm.dto.customer.request.CreateCustomerRequest;
import com.sgdcbrk.crm.dto.customer.request.UpdateCustomerRequest;
import com.sgdcbrk.crm.dto.stats.ChartData;
import com.sgdcbrk.crm.model.customer.Customer;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@AllArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/create")
    public ResponseEntity<String> createCustomer(@RequestBody @Valid CreateCustomerRequest createCustomerRequest) {
        try {
            customerService.addCustomer(createCustomerRequest);
            return ResponseEntity.status(201).body("Customer created");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating customer: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable long id, @RequestBody @Valid UpdateCustomerRequest customer) {
        try {
            customerService.updateCustomer(id, customer);
            return ResponseEntity.ok("Customer updated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating customer: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable long id) {
        try {
            customerService.deleteCustomerById(id);
            return ResponseEntity.ok("Customer deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting customer: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findCustomerById(@PathVariable long id) {
        try {
            Customer customer = customerService.findCustomerById(id);
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding customer: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> findCustomerByEmail(@RequestParam String email) {
        try {
            var customers = customerService.findCustomerByEmail(email);
            return ResponseEntity.ok(customers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding customer by email: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> findAllCustomers() {
        try {
            List<Customer> customers = customerService.findAllCustomers();
            return ResponseEntity.ok(customers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding all customers: " + e.getMessage());
        }
    }

    // table dataset
    @GetMapping("/total-count")
    public ResponseEntity<?> getTotalCustomerCount() {
        long totalCount = customerService.getTotalCustomerCount();
        return ResponseEntity.ok(Map.of("totalCustomerCount", totalCount));
    }

    @GetMapping("/company-count")
    public ResponseEntity<List<ChartData>> getCustomerCountByCompany() {
        var response = customerService.getCustomerCountByCompany();
        return ResponseEntity.ok(response);
    }
}
