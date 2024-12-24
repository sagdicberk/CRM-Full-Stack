package com.sgdcbrk.crm.business.concretes;

import com.sgdcbrk.crm.business.abstracts.CompanyService;
import com.sgdcbrk.crm.model.company.Company;
import com.sgdcbrk.crm.repository.CompanyRepository;
import com.sgdcbrk.crm.util.mapper.ModelMapperService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyManager implements CompanyService {

    private final CompanyRepository companyRepository;
    private final ModelMapperService modelMapperService;

    @Override
    public void addCompany(Company company) {
        companyRepository.save(company);
    }

    @Override
    public void updateCompany(long id ,Company company) {
        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id " + company.getId()));

        // Burada aynı isimdeki fieldları eşleyerek dönüşüm gerçekleşir.
        modelMapperService.forRequest().map(company, existingCompany);

        companyRepository.save(existingCompany);
    }

    @Override
    public void deleteCompanyById(long id) {
        companyRepository.deleteById(id);
    }

    @Override
    public Company findCompanyById(long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No company found with id " + id));
    }

    @Override
    public List<Company> findCompanyByName(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("No company found with name " + name));
    }

    @Override
    public List<Company> findAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public long CompanyCount() {
        return companyRepository.count();
    }
}
