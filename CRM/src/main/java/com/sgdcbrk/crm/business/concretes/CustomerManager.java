package com.sgdcbrk.crm.business.concretes;

import com.sgdcbrk.crm.business.abstracts.CompanyService;
import com.sgdcbrk.crm.business.abstracts.CustomerService;
import com.sgdcbrk.crm.dto.customer.request.CreateCustomerRequest;
import com.sgdcbrk.crm.dto.customer.request.UpdateCustomerRequest;
import com.sgdcbrk.crm.dto.stats.ChartData;
import com.sgdcbrk.crm.model.customer.Customer;
import com.sgdcbrk.crm.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerManager implements CustomerService {
    private final CustomerRepository customerRepository;
    private final CompanyService companyService;

    @Override
    public void addCustomer(CreateCustomerRequest customer) {
        try {

            Customer newCustomer = new Customer();
            newCustomer.setName(customer.getName());
            newCustomer.setAddress(customer.getAddress());
            newCustomer.setEmail(customer.getEmail());
            newCustomer.setPhone(customer.getPhone());
            newCustomer.setCompany(companyService.findCompanyById(customer.getCompanyId()));
            customerRepository.save(newCustomer);


        } catch (Exception e) {
            throw new RuntimeException("Error creating customer: " + e.getMessage());
        }
    }

    @Override
    public void updateCustomer(long id, UpdateCustomerRequest customer) {
        try {
            Customer existingCustomer = customerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
            existingCustomer.setName(customer.getName());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setPhone(customer.getPhone());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setCompany(companyService.findCompanyById(customer.getCompanyId()));
            customerRepository.save(existingCustomer);
        } catch (Exception e) {
            throw new RuntimeException("Error updating customer: " + e.getMessage());
        }
    }

    @Override
    public void deleteCustomerById(long id) {
        try {
            customerRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting customer: " + e.getMessage());
        }
    }

    @Override
    public Customer findCustomerById(long id) {
        try {
            return customerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        } catch (Exception e) {
            throw new RuntimeException("Error finding customer: " + e.getMessage());
        }
    }

    @Override
    public List<Customer> findCustomerByEmail(String email) {
        try {
            return customerRepository.findByEmailContainsIgnoreCase(email)
                    .orElseThrow(() -> new RuntimeException("Customer not found with email: " + email));
        } catch (Exception e) {
            throw new RuntimeException("Error finding customer by email: " + e.getMessage());
        }
    }

    @Override
    public List<Customer> findAllCustomers() {
        try {
            return customerRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error finding all customers: " + e.getMessage());
        }
    }

    @Override
    public long getTotalCustomerCount() {
        return customerRepository.count();
    }

    @Override
    public List<ChartData> getCustomerCountByCompany() {
        // Sorgudan dönen Object[] listesi
        List<Object[]> data = customerRepository.countCustomersByCompany();

        // Her Object[]'i ChartData'ya dönüştürmek
        return data.stream()
                .map(objects -> new ChartData(
                        (String) objects[0],  // Şirket adı (Object[0])
                        (long) objects[1]     // Müşteri sayısı (Object[1])
                ))
                .collect(Collectors.toList());

    }

}
