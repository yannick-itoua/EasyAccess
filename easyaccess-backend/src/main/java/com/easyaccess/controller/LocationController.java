package com.easyaccess.controller;

import com.easyaccess.model.Location;
import com.easyaccess.repository.LocationRepository;
import com.easyaccess.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping
    public Page<Location> getLocations(
        @RequestParam(required = false) String country,
        @RequestParam(required = false) String city,
        @RequestParam(required = false) String village,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        // Use your repository's filter method if any filter is set
        if (country != null || city != null || village != null) {
            List<Location> filtered = locationRepository.findByPlace(country, city, village);
            // Manual pagination for filtered results
            int start = Math.min(page * size, filtered.size());
            int end = Math.min(start + size, filtered.size());
            return new PageImpl<>(filtered.subList(start, end), pageable, filtered.size());
        }
        // No filter: use built-in pagination
        return locationRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable Long id) {
        return locationService.getLocationById(id);
    }

    @PostMapping
    public Location addLocation(@RequestBody Location location) {
        return locationService.addLocation(location);
    }

    // Update location, requires userRole as a request parameter or header
    @PutMapping("/{id}")
    public Location updateLocation(
            @PathVariable Long id,
            @RequestBody Location location,
            @RequestParam String userRole // or use @RequestHeader("userRole") String userRole
    ) {
        return locationService.updateLocation(id, location, userRole);
    }

    // Delete location, requires userRole as a request parameter or header
    @DeleteMapping("/{id}")
    public void deleteLocation(
            @PathVariable Long id,
            @RequestParam String userRole // or use @RequestHeader("userRole") String userRole
    ) {
        locationService.deleteLocation(id, userRole);
    }
}