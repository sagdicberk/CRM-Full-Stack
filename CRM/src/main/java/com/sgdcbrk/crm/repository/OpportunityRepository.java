package com.sgdcbrk.crm.repository;

import com.sgdcbrk.crm.model.opportunity.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    // Search
    Optional<List<Opportunity>> findByNameContainingIgnoreCase(String searchTerm);

    // value
    Optional<List<Opportunity>> OrderByValueAsc();
    Optional<List<Opportunity>> OrderByValueDesc();

    // Date
    Optional<List<Opportunity>> OrderByExpectedCloseDateAsc();
    Optional<List<Opportunity>> OrderByExpectedCloseDateDesc();


    // for stats

    @Query("SELECT c.name, COUNT(o) FROM Opportunity o " +
            "JOIN o.customer cust " +  // Customer ile ilişki
            "JOIN cust.company c " +  // Customer'ın Company ile ilişkisini kullanıyoruz
            "GROUP BY c.name")
    List<Object[]> countOpportunitiesByCompany();




    @Query("SELECT COUNT(o) FROM Opportunity o WHERE o.status = 'OPEN'")
    long countOpenOpportunities();

    // Durumu kazanılmış olan fırsatları almak için
    @Query("SELECT COUNT(o) FROM Opportunity o WHERE o.status = 'WON'")
    long countWonOpportunities();

    // Durumu kaybedilmiş olan fırsatları almak için
    @Query("SELECT COUNT(o) FROM Opportunity o WHERE o.status = 'LOST'")
    long countLostOpportunities();

    @Query("SELECT o.customer.name, COUNT(o) " +
            "FROM Opportunity o " +
            "GROUP BY o.customer.name " +
            "ORDER BY COUNT(o) DESC")
    List<Object[]> findTop5CustomersByOpportunities();

}
