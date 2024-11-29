package com.sgdcbrk.crm.repository;

import com.sgdcbrk.crm.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<List<Customer>> findByEmailContainsIgnoreCase(String email);

    @Query("SELECT c.company.name, COUNT(c) FROM Customer c GROUP BY c.company.name")
    List<Object[]> countCustomersByCompany();
}
