package com.server.chargingStations;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.server.GeoLocation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.types.ObjectId;
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
    public ResponseEntity<String> createChargingStation(@RequestBody ChargingStationJson chargingStationJson, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        try
        {
            // Check if the location already exists in the database
            ChargingStation existingChargingStation = m_chargingStationsRepository.findByLocation(chargingStationJson.getLocation()).orElseThrow(() -> new RuntimeException("Charging Station not found"));
            jsonObject.addProperty("message", "ChargingStation already exists with the given location.");
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        catch (RuntimeException runtimeException)
        {
            ChargingStation chargingStation = new ChargingStation(chargingStationJson.getLocation(), (ObjectId) session.getAttribute("id"),
                    chargingStationJson.getPricePerVolt(), chargingStationJson.getChargerType());
            m_chargingStationsRepository.save(chargingStation);
            jsonObject.addProperty("message", "Created ChargingStation successfully.");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteChargingStationByLocation(@RequestBody GeoLocation location, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        ChargingStation station = m_chargingStationsRepository.findByLocation(location).orElseThrow(() -> new RuntimeException("Charging Station not found"));
        if(station.getOwnerId().equals((ObjectId) session.getAttribute("id")))
        {
            station.unCharge();
            m_chargingStationsRepository.save(station);
            m_chargingStationsRepository.deleteByLocation(location);
            jsonObject.addProperty("message", "Charging station deleted successfully");
        }
        else
        {
            httpStatus = HttpStatus.FORBIDDEN;
            jsonObject.addProperty("message", "You do not have permission to delete this charging station");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<String> deleteAllChargingStationsByOwner(HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        List<ChargingStation> chargingStations = m_chargingStationsRepository.findByOwnerId((ObjectId) session.getAttribute("id"));
        if(chargingStations.isEmpty())
        {
            jsonObject.addProperty("message", "No charging stations found for this owner");
        }
        else
        {
            for (ChargingStation station : chargingStations) {
                // Uncharge each charging station before deleting it
                station.unCharge();
                m_chargingStationsRepository.save(station);
            }
            m_chargingStationsRepository.deleteAllByOwnerId((ObjectId) session.getAttribute("id"));
            jsonObject.addProperty("message", "All charging stations deleted successfully");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

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

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getChargingStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getChargingStation(@RequestBody GeoLocation location, HttpServletRequest request) {
        /*// Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }*/

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        try
        {
            ChargingStation station = m_chargingStationsRepository.findByLocation(location).orElseThrow(() -> new RuntimeException("Charging Station not found"));
            ChargingStationDTO chargingStationDTO = new ChargingStationDTO(station.getLocation(), station.getPricePerVolt(), station.getChargerType());
            Gson gson = new Gson();
            JsonElement jsonElement = gson.toJsonTree(chargingStationDTO);
            JsonObject chargingStationJson = jsonElement.getAsJsonObject();
            jsonObject.add("chargingStation", chargingStationJson);
        }
        catch (RuntimeException runtimeException)
        {
            httpStatus = HttpStatus.NOT_FOUND;
            jsonObject.addProperty("error", runtimeException.getMessage());
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
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
            jsonObject.addProperty("message", "Charging...");
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
            jsonObject.addProperty("message", "UnCharge.");
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

    @PutMapping("/updatePricePerVolt")
    public ResponseEntity<String> updatePricePerVolt(@RequestParam("pricePerVolt") double pricePerVolt, @RequestBody GeoLocation location, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        ChargingStation station = m_chargingStationsRepository.findByLocation(location).orElseThrow(() -> new RuntimeException("Charging Station not found"));
        // Check if the input string is a valid price
        if (pricePerVolt <= 0)
        {
            httpStatus = HttpStatus.BAD_REQUEST;
            jsonObject.addProperty("error", "Invalid price per volt");        }
        else
        {
            station.setPricePerVolt(pricePerVolt);
            m_chargingStationsRepository.save(station);
            jsonObject.addProperty("message", "Update price per volt successfully.");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
}
