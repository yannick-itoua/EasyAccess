package com.easyaccess.service;

import com.easyaccess.model.Location;
import com.easyaccess.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getLocationsByPlace(String country, String city, String village) {
        return locationRepository.findByPlace(country, city, village);
    }

    public Location getLocationById(Long id) {
        Optional<Location> location = locationRepository.findById(id);
        return location.orElse(null);
    }

    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location updateLocation(Long id, Location updatedLocation, String userRole) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            throw new SecurityException("Only admins can update locations.");
        }
        return locationRepository.findById(id)
                .map(location -> {
                    location.setName(updatedLocation.getName());
                    location.setDescription(updatedLocation.getDescription());
                    location.setLatitude(updatedLocation.getLatitude());
                    location.setLongitude(updatedLocation.getLongitude());
                    location.setCountry(updatedLocation.getCountry());
                    location.setCity(updatedLocation.getCity());
                    location.setVillage(updatedLocation.getVillage());
                    location.setWheelchairAccessible(updatedLocation.isWheelchairAccessible());
                    location.setAccessibleToilet(updatedLocation.isAccessibleToilet());
                    location.setWideEntrance(updatedLocation.isWideEntrance());
                    location.setParkingAvailable(updatedLocation.isParkingAvailable());
                    return locationRepository.save(location);
                })
                .orElse(null);
    }

    public void deleteLocation(Long id, String userRole) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            throw new SecurityException("Only admins can delete locations.");
        }
        locationRepository.deleteById(id);
    }
}