package com.easyaccess.controller;

import com.easyaccess.model.Location;
import com.easyaccess.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping
    public List<Location> getAllLocations(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String village
    ) {
        if (country != null || city != null || village != null) {
            return locationService.getLocationsByPlace(country, city, village);
        }
        return locationService.getAllLocations();
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