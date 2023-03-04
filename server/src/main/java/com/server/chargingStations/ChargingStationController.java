package com.server.chargingStations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chargingStations")
public class ChargingStationController {

    @Autowired
    private ChargingStationRepository m_chargingStationsRepository;

    @PostMapping("/createChargingStation")
    public void createChargingStation(@RequestBody ChargingStation chargingStation) {
        m_chargingStationsRepository.save(chargingStation);
    }

    // TODO E - DELETE ChargingStation

    // TODO E - GET getAllChargingStationsLocations

    // TODO E - Charge

    // TODO E - UnCharge
}
