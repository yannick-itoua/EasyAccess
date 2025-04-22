package com.easyaccess.repository;

import com.easyaccess.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query("SELECT l FROM Location l WHERE " +
           "(:country IS NULL OR :country = '' OR LOWER(l.country) = LOWER(:country)) AND " +
           "(:city IS NULL OR :city = '' OR LOWER(l.city) = LOWER(:city)) AND " +
           "(:village IS NULL OR :village = '' OR LOWER(l.village) = LOWER(:village))")
    List<Location> findByPlace(
        @Param("country") String country,
        @Param("city") String city,
        @Param("village") String village
    );
}