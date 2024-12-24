package com.sgdcbrk.crm.controller;

import com.sgdcbrk.crm.business.abstracts.OpportunityService;
import com.sgdcbrk.crm.dto.opportunity.request.OpportunityRequest;
import com.sgdcbrk.crm.dto.stats.ChartData;
import com.sgdcbrk.crm.model.opportunity.Opportunity;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/opportunities")
@AllArgsConstructor
public class OpportunityController {
    private final OpportunityService opportunityService;

    @PostMapping
    public ResponseEntity<String> createOpportunity(@RequestBody @Valid OpportunityRequest request) {
        try {
            opportunityService.saveOpportunity(request);
            return ResponseEntity.ok("Opportunity created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating opportunity: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateOpportunity(@PathVariable long id, @RequestBody @Valid OpportunityRequest request) {
        try {
            opportunityService.updateOpportunity(id, request);
            return ResponseEntity.ok("Opportunity updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating opportunity: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOpportunity(@PathVariable long id) {
        try {
            opportunityService.deleteOpportunityById(id);
            return ResponseEntity.ok("Opportunity deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting opportunity: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Opportunity> getOpportunity(@PathVariable long id) {
        try {
            Opportunity opportunity = opportunityService.getOpportunity(id);
            return ResponseEntity.ok(opportunity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Opportunity>> getOpportunities() {
        try {
            List<Opportunity> opportunities = opportunityService.getOpportunities();
            return ResponseEntity.ok(opportunities);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }
    // -- -- -- -- QUERIED LISTS -- -- -- //


    // Ordered By Value
    @GetMapping("/value-asc")
    public ResponseEntity<List<Opportunity>> getOpportunitiesByValueOrderAsc() {
        try {
            List<Opportunity> opportunities = opportunityService.getOpportunitiesByIncreaseValue();
            return ResponseEntity.ok(opportunities);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/value-desc")
    public ResponseEntity<List<Opportunity>> getOpportunitiesByValueOrderDesc() {
        try {
            List<Opportunity> opportunities = opportunityService.getOpportunitiesByDecreaseValue();
            return ResponseEntity.ok(opportunities);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Ordered By Date
    @GetMapping("/date-asc")
    public ResponseEntity<List<Opportunity>> getOpportunitiesByDateOrderAsc() {
        try {
            List<Opportunity> opportunities = opportunityService.getOpportunitiesByShortestDate();
            return ResponseEntity.ok(opportunities);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/date-desc")
    public ResponseEntity<List<Opportunity>> getOpportunitiesByDateOrderDesc() {
        try {
            List<Opportunity> opportunities = opportunityService.getOpportunitiesByLongestDate();
            return ResponseEntity.ok(opportunities);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Search
    @GetMapping("/search")
    public ResponseEntity<List<Opportunity>> getOpportunityBySearch(@RequestParam String search) {
        try {
            List<Opportunity> opportunities = opportunityService.searchOpportunities(search);
            return ResponseEntity.ok(opportunities);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // stats - for charts
    @GetMapping("/stats/by-company")
    public List<?> getOpportunitiesByCompany() {
       return opportunityService.getOpportunitiesByCompany();

    }

    // Açık fırsatların sayısını getiren endpoint
    @GetMapping("/stats/open")
    public long getOpenOpportunitiesCount() {
        return opportunityService.getOpenOpportunitiesCount();
    }

    // Kazanılmış fırsatların sayısını getiren endpoint
    @GetMapping("/stats/won")
    public long getWonOpportunitiesCount() {
        return opportunityService.getWonOpportunitiesCount();
    }

    // Kaybedilmiş fırsatların sayısını getiren endpoint
    @GetMapping("/stats/lost")
    public long getLostOpportunitiesCount() {
        return opportunityService.getLostOpportunitiesCount();
    }

    // En fazla fırsat getiren müşteri bilgisini getiren endpoint
    @GetMapping("/stats/top-customer")
    public List<ChartData> getTopCustomerByOpportunities() {
        return opportunityService.getTopCustomersByOpportunities();

    }

    // status

    @PostMapping("/{id}/won")
    public ResponseEntity<String> completeOpportunityWithWon(@PathVariable long id) {
        try {
            Opportunity opportunity = opportunityService.getOpportunity(id);
            opportunityService.completeOpportunityWithWon(opportunity);
            return ResponseEntity.ok("Opportunity marked as WON");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error marking opportunity as WON: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/lost")
    public ResponseEntity<String> completeOpportunityWithLost(@PathVariable long id) {
        try {
            Opportunity opportunity = opportunityService.getOpportunity(id);
            opportunityService.completeOpportunityWithLost(opportunity);
            return ResponseEntity.ok("Opportunity marked as LOST");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error marking opportunity as LOST: " + e.getMessage());
        }
    }
}









