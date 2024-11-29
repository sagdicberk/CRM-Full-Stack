package com.sgdcbrk.crm.business.abstracts;

import com.sgdcbrk.crm.dto.opportunity.request.OpportunityRequest;
import com.sgdcbrk.crm.dto.stats.ChartData;
import com.sgdcbrk.crm.model.opportunity.Opportunity;

import java.util.List;
import java.util.Map;

public interface OpportunityService {
    void saveOpportunity(OpportunityRequest request);
    void updateOpportunity(long id, OpportunityRequest request);
    void deleteOpportunityById(long id);

    // Change status
    void completeOpportunityWithWon(Opportunity opportunity);
    void completeOpportunityWithLost(Opportunity opportunity);
    // queries - value
    List<Opportunity> getOpportunitiesByIncreaseValue();
    List<Opportunity> getOpportunitiesByDecreaseValue();

    // queries - Date
    List<Opportunity> getOpportunitiesByShortestDate();
    List<Opportunity> getOpportunitiesByLongestDate();

    // search
    List<Opportunity> searchOpportunities(String searchTerm);

    // default get functions
    Opportunity getOpportunity(long id);
    List<Opportunity> getOpportunities();

    // stats - for charts
    List<ChartData> getOpportunitiesByCompany();
    long getOpenOpportunitiesCount();
    long getWonOpportunitiesCount();
    long getLostOpportunitiesCount();
    List<ChartData> getTopCustomersByOpportunities();
}
