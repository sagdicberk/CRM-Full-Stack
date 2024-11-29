package com.sgdcbrk.crm.business.abstracts;

import com.sgdcbrk.crm.model.company.Company;

import java.util.List;

public interface CompanyService {
    void addCompany(Company company);
    void updateCompany(long id,Company company);
    void deleteCompanyById(long id);
    Company findCompanyById(long id);
    List<Company> findCompanyByName(String name);
    List<Company> findAllCompanies();
    long CompanyCount();

}
