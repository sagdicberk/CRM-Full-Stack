package com.sgdcbrk.crm.controller;

import com.sgdcbrk.crm.business.abstracts.CompanyService;
import com.sgdcbrk.crm.model.company.Company;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@AllArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping("/create")
    public ResponseEntity<?> createCompany(@RequestBody Company company) {
        try {
            companyService.addCompany(company);
            return ResponseEntity.status(201).body("Company created");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating company: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable long id, @RequestBody Company company) {
        try {
            companyService.updateCompany(id, company);
            return ResponseEntity.ok("Company updated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating company: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable long id) {
        try {
            companyService.deleteCompanyById(id);
            return ResponseEntity.ok("Company deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting company: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findCompanyById(@PathVariable long id) {
        try {
            Company company = companyService.findCompanyById(id);
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding company: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> findCompanyByName(@RequestParam String name) {
        try {
            List<Company> companies= companyService.findCompanyByName(name);
            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding company by name: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> findAllCompanies() {
        try {
            List<Company> companies = companyService.findAllCompanies();
            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding all companies: " + e.getMessage());
        }
    }


    @GetMapping("/count")
    public ResponseEntity<?> getCompanyCount() {
        try {
            long count = companyService.CompanyCount();
            return ResponseEntity.ok(count); // Başarılı yanıt
        } catch (Exception e) {
            // Hata mesajını dön
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Şirket sayısı alınırken bir hata oluştu: " + e.getMessage());
        }
    }
}
