package com.server.users;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.types.ObjectId;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
@EnableMongoHttpSession
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository m_userRepository;

    @PostMapping("/registration")
    public ResponseEntity<String> registerUser(@RequestBody User user, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        Optional<User> existingUser = m_userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent())
        {
            // email already exists in database, return error response
            httpStatus = HttpStatus.CONFLICT;
            jsonObject.addProperty("error", "Email already exists in the database");
        }
        else
        {
            // Check if email is valid
            Pattern emailPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$");
            Matcher emailMatcher = emailPattern.matcher(user.getEmail());

            if (!emailMatcher.matches())
            {
                httpStatus = HttpStatus.BAD_REQUEST;
                jsonObject.addProperty("error", "Invalid email format");
            }
            else
            {
                String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
                user.setPassword(hashedPassword);
                m_userRepository.save(user);

                // Set user attributes in session
                HttpSession session = request.getSession(true);
                session.setAttribute("id", user.getId());

                jsonObject.addProperty("message", "Register successfully.");
                jsonObject.addProperty("token", session.getId());
            }
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody EmailAndPassword emailAndPassword, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();
        User user = m_userRepository.findByEmail(emailAndPassword.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        String hashedPassword = user.getPassword();
        if (!BCrypt.checkpw(emailAndPassword.getPassword(), hashedPassword)) {
            throw new RuntimeException("Invalid credentials");
        }

        // Set user attributes in session
        HttpSession session = request.getSession(true);
        session.setAttribute("id", user.getId());

        jsonObject.addProperty("message", "Login successfully.");
        jsonObject.addProperty("token", session.getId());

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        HttpSession session = request.getSession(false);

        if (session != null)
        {
            session.invalidate(); // invalidate the session
            jsonObject.addProperty("message", "Logout successfully.");
        }
        else
        {
            httpStatus = HttpStatus.BAD_REQUEST;
            jsonObject.addProperty("error", "No session found.");
        }
        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    // @DeleteMapping ("/deleteUser")
    // public ResponseEntity<?> deleteUser(HttpServletRequest request) {

    //     // Check if user is logged in
    //     HttpSession session = request.getSession(false);
    //     if (session == null) {
    //         throw new RuntimeException("Unauthorized");
    //     }

    //     HttpStatus httpStatus = HttpStatus.OK;
    //     JsonObject jsonObject = new JsonObject();

    //     User user = m_userRepository.findById((ObjectId) session.getAttribute("id")).orElseThrow(() -> new RuntimeException("User not found"));

    //     // delete all charging stations owned by the user
    //     RestTemplate restTemplate = new RestTemplate();
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.add("Cookie", request.getHeader("Cookie"));
    //     HttpEntity<String> httpEntity = new HttpEntity<>(headers);
    //     String url = "http://localhost:8080/chargingStations/delete-all";
    //     ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, String.class);
    //     jsonObject.addProperty("deleteAllChargingStationsByOwner message", response.getBody());
    //     if(response.getStatusCode() == HttpStatus.OK)
    //     {
    //         m_userRepository.delete(user);
    //         jsonObject.addProperty("message", "User deleted successfully.");
    //         session.invalidate(); // kill the session
    //     }
    //     else
    //     {
    //         httpStatus = (HttpStatus) response.getStatusCode();
    //         jsonObject.addProperty("error", "Failed to delete user.");
    //     }

    //     return ResponseEntity.status(httpStatus)
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .body(jsonObject.toString());
    // }

    @PutMapping("/updateUserPassword")
    public ResponseEntity<String> updateUserPassword(@RequestParam("password") String password, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        User user = m_userRepository.findById((ObjectId) session.getAttribute("id")).orElseThrow(() -> new RuntimeException("User not found"));
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        user.setPassword(hashedPassword);
        m_userRepository.save(user);
        jsonObject.addProperty("message", "Update password successfully.");

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PutMapping("/updateUserFirstName")
    public ResponseEntity<String> updateUserFirstName(@RequestParam("firstName") String firstName, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        User user = m_userRepository.findById((ObjectId) session.getAttribute("id")).orElseThrow(() -> new RuntimeException("User not found"));
        // Check if the input string is a valid first name
        if (!firstName.matches("[a-zA-Z]+"))
        {
            httpStatus = HttpStatus.BAD_REQUEST;
            jsonObject.addProperty("error", "Invalid first name");        }
        else
        {
            user.setFirstName(firstName);
            m_userRepository.save(user);
            jsonObject.addProperty("message", "Update first Name successfully.");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PutMapping("/updateUserLastName")
    public ResponseEntity<String> updateUserLastName(@RequestParam("lastName") String lastName, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        User user = m_userRepository.findById((ObjectId) session.getAttribute("id")).orElseThrow(() -> new RuntimeException("User not found"));
        // Check if the input string is a valid last name
        if (!lastName.matches("[a-zA-Z]+"))
        {
            httpStatus = HttpStatus.BAD_REQUEST;
            jsonObject.addProperty("error", "Invalid last name");        }
        else
        {
            user.setLastName(lastName);
            m_userRepository.save(user);
            jsonObject.addProperty("message", "Update last Name successfully.");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
    @PutMapping("/updateUserEmail")
    public ResponseEntity<String> updateUserEmail(@RequestParam("email") String email, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();
        User user = m_userRepository.findById((ObjectId) session.getAttribute("id")).orElseThrow(() -> new RuntimeException("User not found"));

        Optional<User> existingUser = m_userRepository.findByEmail(email);
        if (existingUser.isPresent())
        {
            // email already exists in database, return error response
            httpStatus = HttpStatus.CONFLICT;
            jsonObject.addProperty("error", "Email already exists in the database");
        }
        else
        {
            // Check if email is valid
            Pattern emailPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$");
            Matcher emailMatcher = emailPattern.matcher(email);

            if (!emailMatcher.matches())
            {
                httpStatus = HttpStatus.BAD_REQUEST;
                jsonObject.addProperty("error", "Invalid email format");
            }
            else
            {
                user.setEmail(email);
                m_userRepository.save(user);
                jsonObject.addProperty("message", "Update email successfully.");
            }
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    @PutMapping("/updateUserPhoneNumber")
    public ResponseEntity<String> updateUserPhoneNumber(@RequestParam("phoneNumber") String phoneNumber, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Check if phone number is valid Israeli phone number
        if (!phoneNumber.matches("^0([23489]|5[0248]|77)[1-9]\\d{6}$"))
        {
            httpStatus = HttpStatus.BAD_REQUEST;
            jsonObject.addProperty("error", "Invalid phone number.");
        }
        else
        {
            User user = m_userRepository.findById((ObjectId) session.getAttribute("id")).orElseThrow(() -> new RuntimeException("User not found"));
            user.setPhoneNumber(phoneNumber);
            m_userRepository.save(user);
            jsonObject.addProperty("message", "Update phone Number successfully.");
        }

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
}

