package com.server.chargingStations;

import com.google.gson.JsonObject;
import com.server.GeoLocation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
    public ResponseEntity<String> createChargingStation(@RequestBody ChargingStation chargingStation, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        m_chargingStationsRepository.save(chargingStation);

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    // TODO E - DELETE ChargingStation

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAllChargingStationsLocations", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Iterable<GeoLocation> getAllChargingStationsLocations(HttpServletRequest request) {
        /*// Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }*/

        List<GeoLocation> locations = m_mongoTemplate.query(ChargingStation.class)
                .distinct("location")
                .as(GeoLocation.class)
                .all();
        return locations;
    }

    @PutMapping("/charge")
    public ResponseEntity<String> charge(@RequestBody GeoLocation location, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        ChargingStation station = m_chargingStationsRepository.findByLocation(location).orElseThrow(() -> new RuntimeException("Charging Station not found"));
        if(station.getStatus().equals(Estatus.NOT_CHARGING))
        {
            station.charge();
            m_chargingStationsRepository.save(station);
        }
        else
        {
            String errorMessage;
            httpStatus = HttpStatus.LOCKED;
            errorMessage = "ChargingStation is charging.";
            jsonObject.addProperty("error-message", errorMessage);
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PutMapping("/unCharge")
    public ResponseEntity<String> unCharge(@RequestBody GeoLocation location, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        ChargingStation station = m_chargingStationsRepository.findByLocation(location).orElseThrow(() -> new RuntimeException("Charging Station not found"));
        if(station.getStatus().equals(Estatus.CHARGING))
        {
            station.unCharge();
            m_chargingStationsRepository.save(station);
        }
        else
        {
            String errorMessage;
            httpStatus = HttpStatus.BAD_REQUEST;
            errorMessage = "ChargingStation isn't charging.";
            jsonObject.addProperty("error-message", errorMessage);
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
}
