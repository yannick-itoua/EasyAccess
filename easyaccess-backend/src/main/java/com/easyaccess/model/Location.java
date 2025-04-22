package com.easyaccess.model;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    // New fields for filtering
    private String country;
    private String city;
    private String village;

    // Accessibility features
    private boolean wheelchairAccessible;
    private boolean accessibleToilet;
    private boolean wideEntrance;
    private boolean parkingAvailable;

    // Constructors
    public Location() {}

    public Location(String name, String description, double latitude, double longitude,
                    String country, String city, String village,
                    boolean wheelchairAccessible, boolean accessibleToilet, boolean wideEntrance, boolean parkingAvailable) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.country = country;
        this.city = city;
        this.village = village;
        this.wheelchairAccessible = wheelchairAccessible;
        this.accessibleToilet = accessibleToilet;
        this.wideEntrance = wideEntrance;
        this.parkingAvailable = parkingAvailable;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public boolean isWheelchairAccessible() {
        return wheelchairAccessible;
    }

    public void setWheelchairAccessible(boolean wheelchairAccessible) {
        this.wheelchairAccessible = wheelchairAccessible;
    }

    public boolean isAccessibleToilet() {
        return accessibleToilet;
    }

    public void setAccessibleToilet(boolean accessibleToilet) {
        this.accessibleToilet = accessibleToilet;
    }

    public boolean isWideEntrance() {
        return wideEntrance;
    }

    public void setWideEntrance(boolean wideEntrance) {
        this.wideEntrance = wideEntrance;
    }

    public boolean isParkingAvailable() {
        return parkingAvailable;
    }

    public void setParkingAvailable(boolean parkingAvailable) {
        this.parkingAvailable = parkingAvailable;
    }
}