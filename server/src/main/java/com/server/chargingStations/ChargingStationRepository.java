package com.server.chargingStations;

import com.server.GeoLocation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChargingStationRepository extends MongoRepository<ChargingStation, String> {
    Optional<ChargingStation> findByLocation(GeoLocation location);
}
