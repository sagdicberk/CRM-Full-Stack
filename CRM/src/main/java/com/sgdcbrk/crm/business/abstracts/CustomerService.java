package com.sgdcbrk.crm.business.abstracts;

import com.sgdcbrk.crm.dto.customer.request.CreateCustomerRequest;
import com.sgdcbrk.crm.dto.customer.request.UpdateCustomerRequest;
import com.sgdcbrk.crm.dto.stats.ChartData;
import com.sgdcbrk.crm.model.customer.Customer;

import java.util.List;
import java.util.Map;

public interface CustomerService {
    void addCustomer(CreateCustomerRequest customer);
    void updateCustomer(long id, UpdateCustomerRequest customer);
    void deleteCustomerById(long id);
    Customer findCustomerById(long id);
    List<Customer> findCustomerByEmail(String email);
    List<Customer> findAllCustomers();
    long getTotalCustomerCount();
    List<ChartData> getCustomerCountByCompany();

}
