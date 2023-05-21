package com.server.chargingStations;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.server.location.GeoLocation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import static com.server.location.GeoUtils.distanceBetweenPointsInKilometers;

@RestController
@RequestMapping("/chargingStations")
public class ChargingStationController {
    @Autowired
    private ChargingStationRepository m_chargingStationsRepository;

    @PostMapping("/createChargingStation")
    public ResponseEntity<String> createChargingStation(@RequestBody ChargingStationJson chargingStationJson, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
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
                        chargingStationJson.getPricePerVolt(), chargingStationJson.getChargerType(), chargingStationJson.getStationName());
                m_chargingStationsRepository.save(chargingStation);
                jsonObject.addProperty("message", "Created ChargingStation successfully.");
                jsonObject.addProperty("chargingStationId", chargingStation.getId().toString());
            }
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteChargingStationById(@RequestParam("chargingStationId") String chargingStationId, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
            ChargingStation station = m_chargingStationsRepository.findById(new ObjectId(chargingStationId)).orElseThrow(() -> new RuntimeException("Charging Station not found"));
            if(station.getOwnerId().equals((ObjectId) session.getAttribute("id")))
            {
                station.unCharge();
                m_chargingStationsRepository.save(station);
                m_chargingStationsRepository.deleteByLocation(station.getLocation());
                jsonObject.addProperty("message", "Charging station deleted successfully");
            }
            else
            {
                httpStatus = HttpStatus.FORBIDDEN;
                jsonObject.addProperty("message", "You do not have permission to delete this charging station");
            }
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<String> deleteAllChargingStationsByOwner(HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
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
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAllChargingStations", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAllChargingStations(HttpServletRequest request) {
        /*// Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }*/

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        List<ChargingStation> chargingStations = m_chargingStationsRepository.findAll();

        // Convert the list of charging stations to JSON
        Gson gson = new Gson();
        JsonArray jsonArray = new JsonArray();
        int index = 0;
        for (ChargingStation station : chargingStations) {
            JsonObject chargingStationJson = new JsonObject();
            ChargingStationDTO chargingStationDTO = new ChargingStationDTO(station.getId().toString(), station.getLocation(), station.getPricePerVolt(), station.getChargerType(), station.getStatus(), station.getStationName());
            chargingStationJson.addProperty(Integer.toString(index++), gson.toJson(chargingStationDTO));
            jsonArray.add(chargingStationJson);
        }
        jsonObject.add("chargingStations", jsonArray);

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @GetMapping(value = "/getAllUserChargingStations", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAllUserChargingStations(HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
            List<ChargingStation> chargingStations = m_chargingStationsRepository.findByOwnerId((ObjectId) session.getAttribute("id"));

            // Convert the list of charging stations to JSON
            Gson gson = new Gson();
            JsonArray jsonArray = new JsonArray();
            int index = 0;
            for (ChargingStation station : chargingStations) {
                JsonObject chargingStationJson = new JsonObject();
                ChargingStationDTO chargingStationDTO = new ChargingStationDTO(station.getId().toString(), station.getLocation(), station.getPricePerVolt(), station.getChargerType(), station.getStatus(), station.getStationName());
                chargingStationJson.addProperty(Integer.toString(index++), gson.toJson(chargingStationDTO));
                jsonArray.add(chargingStationJson);
            }
            jsonObject.add("chargingStations", jsonArray);
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getChargingStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getChargingStation(@RequestParam("chargingStationId") String chargingStationId, HttpServletRequest request) {
        /*// Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }*/

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        try
        {
            ChargingStation station = m_chargingStationsRepository.findById(new ObjectId(chargingStationId)).orElseThrow(() -> new RuntimeException("Charging Station not found"));
            ChargingStationDTO chargingStationDTO = new ChargingStationDTO(station.getId().toString(), station.getLocation(), station.getPricePerVolt(), station.getChargerType(), station.getStatus(), station.getStationName());
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

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getChargingStationsByRadius", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getChargingStationsByRadius(@RequestParam("latitude") double latitude,
                                                              @RequestParam("longitude") double longitude,
                                                              @RequestParam("radius") double radius,
                                                              HttpServletRequest request)
    {
        /*// Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }*/

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        if(radius >= 0)
        {
            List<ChargingStation> chargingStations = m_chargingStationsRepository.findAll();
            List<ChargingStation> chargingStationsWithinRadius = new ArrayList<>();

            for (ChargingStation station : chargingStations) {
                GeoLocation stationLocation = station.getLocation();
                double distanceInKilometers = distanceBetweenPointsInKilometers(latitude, longitude,
                        stationLocation.getLatitude(), stationLocation.getLongitude());

                if (distanceInKilometers <= radius) {
                    chargingStationsWithinRadius.add(station);
                }
            }

            // Sort the charging stations by distance from the given location
            Collections.sort(chargingStationsWithinRadius, new Comparator<ChargingStation>() {
                @Override
                public int compare(ChargingStation station1, ChargingStation station2) {
                    GeoLocation location1 = station1.getLocation();
                    GeoLocation location2 = station2.getLocation();
                    double distance1 = distanceBetweenPointsInKilometers(latitude, longitude,
                            location1.getLatitude(), location1.getLongitude());
                    double distance2 = distanceBetweenPointsInKilometers(latitude, longitude,
                            location2.getLatitude(), location2.getLongitude());

                    return Double.compare(distance1, distance2);
                }
            });


            // Convert the list of charging stations to JSON
            Gson gson = new Gson();
            JsonArray jsonArray = new JsonArray();
            for (ChargingStation station : chargingStationsWithinRadius) {
                JsonObject chargingStationJson = new JsonObject();
                double distanceInKilometers = distanceBetweenPointsInKilometers(latitude, longitude, station.getLocation().getLatitude(), station.getLocation().getLongitude());
                ChargingStationDTO chargingStationDTO = new ChargingStationDTO(station.getId().toString(), station.getLocation(), station.getPricePerVolt(), station.getChargerType(), station.getStatus(), station.getStationName());
                chargingStationJson.addProperty(Double.toString(distanceInKilometers), gson.toJson(chargingStationDTO));
                jsonArray.add(chargingStationJson);
            }

            jsonObject.add("chargingStations", jsonArray);
        }
        else
        {
            httpStatus = HttpStatus.BAD_REQUEST;
            jsonObject.addProperty("error", "Radius must be non-negative");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());

    }

    @PutMapping("/charge")
    public ResponseEntity<String> charge(@RequestParam("chargingStationId") String chargingStationId, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
            ChargingStation station = m_chargingStationsRepository.findById(new ObjectId(chargingStationId)).orElseThrow(() -> new RuntimeException("Charging Station not found"));
            if(station.getStatus().equals(Estatus.NOT_CHARGING))
            {
                try
                {
                    //Test
                    RestTemplate restTemplate = new RestTemplate();
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Cookie", request.getHeader("Cookie"));
                    HttpEntity<String> httpEntity = new HttpEntity<>(headers);
                    String url = "http://localhost:8081/simulator/charge";
                    restTemplate.exchange(url, HttpMethod.PUT, httpEntity, String.class);
                    //EndTest
                }
                catch (Exception exception)
                {

                }

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
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PutMapping("/unCharge")
    public ResponseEntity<String> unCharge(@RequestParam("chargingStationId") String chargingStationId, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
            ChargingStation station = m_chargingStationsRepository.findById(new ObjectId(chargingStationId)).orElseThrow(() -> new RuntimeException("Charging Station not found"));
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
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PutMapping("/updatePricePerVolt")
    public ResponseEntity<String> updatePricePerVolt(@RequestParam("pricePerVolt") double pricePerVolt, @RequestParam("chargingStationId") String chargingStationId, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null)
        {
            httpStatus = HttpStatus.UNAUTHORIZED;
            jsonObject.addProperty("error", "No valid session.");
        }
        else
        {
            ChargingStation station = m_chargingStationsRepository.findById(new ObjectId(chargingStationId)).orElseThrow(() -> new RuntimeException("Charging Station not found"));
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
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
}
