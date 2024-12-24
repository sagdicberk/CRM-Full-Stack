package com.sgdcbrk.crm.business.concretes;

import com.sgdcbrk.crm.business.abstracts.CustomerService;
import com.sgdcbrk.crm.business.abstracts.OpportunityService;
import com.sgdcbrk.crm.dto.opportunity.request.OpportunityRequest;
import com.sgdcbrk.crm.dto.stats.ChartData;
import com.sgdcbrk.crm.model.opportunity.Opportunity;
import com.sgdcbrk.crm.model.opportunity.OpportunityStatus;
import com.sgdcbrk.crm.repository.OpportunityRepository;
import com.sgdcbrk.crm.util.formatter.DateFormatter;
import com.sgdcbrk.crm.util.mapper.ModelMapperService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OpportunityManager implements OpportunityService {
    private final OpportunityRepository opportunityRepository;
    private final CustomerService customerService;
    private final ModelMapperService modelMapperService;

    @Override
    public void saveOpportunity(OpportunityRequest request) {
        Opportunity opportunity = modelMapperService.forRequest().map(request, Opportunity.class);
        opportunity.setStatus(OpportunityStatus.OPEN);
        opportunity.setExpectedCloseDate(DateFormatter.formatter(request.getExpectedCloseDate()));
        opportunity.setCustomer(customerService.findCustomerById(request.getCustomer()));
        opportunityRepository.save(opportunity);
    }

    @Override
    public void updateOpportunity(long id, OpportunityRequest request) {
        Opportunity existingOpportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No opportunity found with id " + id));
        modelMapperService.forRequest().map(request, existingOpportunity);
        existingOpportunity.setExpectedCloseDate(DateFormatter.formatter(request.getExpectedCloseDate()));
        existingOpportunity.setCustomer(customerService.findCustomerById(request.getCustomer()));

        opportunityRepository.save(existingOpportunity);
    }

    @Override
    public void deleteOpportunityById(long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No opportunity found with id " + id));
        opportunityRepository.delete(opportunity);
    }

    @Override
    public void completeOpportunityWithWon(Opportunity opportunity) {
        opportunity.setStatus(OpportunityStatus.WON);
        opportunityRepository.save(opportunity);
    }

    @Override
    public void completeOpportunityWithLost(Opportunity opportunity) {
        opportunity.setStatus(OpportunityStatus.LOST);
        opportunityRepository.save(opportunity);
    }

    @Override
    public List<Opportunity> getOpportunitiesByIncreaseValue() {
        return opportunityRepository.OrderByValueAsc().orElseThrow(() -> new RuntimeException("No opportunity found"));
    }

    @Override
    public List<Opportunity> getOpportunitiesByDecreaseValue() {
        return opportunityRepository.OrderByValueDesc().orElseThrow(() -> new RuntimeException("No opportunity found"));
    }

    @Override
    public List<Opportunity> getOpportunitiesByShortestDate() {
        return opportunityRepository.OrderByExpectedCloseDateAsc().orElseThrow(() -> new RuntimeException("No opportunity found"));
    }

    @Override
    public List<Opportunity> getOpportunitiesByLongestDate() {
        return opportunityRepository.OrderByExpectedCloseDateDesc().orElseThrow(() -> new RuntimeException("No opportunity found"));
    }

    @Override
    public List<Opportunity> searchOpportunities(String searchTerm) {
        return opportunityRepository.findByNameContainingIgnoreCase(searchTerm).orElseThrow(() -> new RuntimeException("No opportunity found"));
    }

    @Override
    public Opportunity getOpportunity(long id) {
        return opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No opportunity found with id " + id));
    }

    @Override
    public List<Opportunity> getOpportunities() {
        return opportunityRepository.findAll();
    }

    @Override
    public List<ChartData> getOpportunitiesByCompany() {
        List<Object[]> data = opportunityRepository.countOpportunitiesByCompany();
        System.out.println(data);
        // Her bir Object[] öğesini ChartData nesnesine dönüştürmek
        return  data.stream()
                .map(objects -> new ChartData((String) objects[0], (long) objects[1]))  // objects[0] şirket adı, objects[1] opportunity sayısı
                .collect(Collectors.toList());


    }

    @Override
    public long getOpenOpportunitiesCount() {
        return opportunityRepository.countOpenOpportunities();
    }

    @Override
    public long getWonOpportunitiesCount() {
        return opportunityRepository.countWonOpportunities();
    }


    @Override
    public long getLostOpportunitiesCount() {
        return opportunityRepository.countLostOpportunities();
    }

    @Override
    public List<ChartData> getTopCustomersByOpportunities() {
        List<Object[]> result = opportunityRepository.findTop5CustomersByOpportunities();

        // Her bir Object[] öğesini ChartData nesnesine dönüştürmek
        return  result.stream()
                .map(objects -> new ChartData((String) objects[0], (long) objects[1]))  // objects[0] şirket adı, objects[1] opportunity sayısı
                .collect(Collectors.toList());

    }

}