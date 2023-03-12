package com.server.chargingStations;

import com.server.GeoLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chargingStations")
public class ChargingStationController {
    @Autowired
    private ChargingStationRepository m_chargingStationsRepository;
    @Autowired
    private MongoTemplate m_mongoTemplate;

    @PostMapping("/createChargingStation")
    public void createChargingStation(@RequestBody ChargingStation chargingStation) {
        m_chargingStationsRepository.save(chargingStation);
    }

    // TODO E - DELETE ChargingStation

    // TODO E - GET getAllChargingStationsLocations
    @GetMapping(value = "/getAllChargingStationsLocations", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<GeoLocation> getAllChargingStationsLocations() {
        List<GeoLocation> locations = m_mongoTemplate.query(ChargingStation.class)
                .distinct("location")
                .as(GeoLocation.class)
                .all();
        return locations;
    }

    // TODO E - Charge

    // TODO E - UnCharge
}
