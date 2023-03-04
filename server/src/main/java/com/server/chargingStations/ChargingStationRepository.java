package com.server.chargingStations;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChargingStationRepository extends MongoRepository<ChargingStation, String> {
}
