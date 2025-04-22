package com.easyaccess.config;

import com.easyaccess.model.Location;
import com.easyaccess.repository.LocationRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

@Configuration
public class JsonDataLoader {
    @Bean
    CommandLineRunner loadJsonData(LocationRepository locationRepository) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<Location>> typeReference = new TypeReference<>() {};
            InputStream inputStream = getClass().getResourceAsStream("/accessible-locations.json");
            if (inputStream != null) {
                List<Location> locations = mapper.readValue(inputStream, typeReference);
                locationRepository.saveAll(locations);
                System.out.println("Sample locations loaded!");
            }
        };
    }
}