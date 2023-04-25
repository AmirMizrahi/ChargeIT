package com.server.users;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;
import org.springframework.web.bind.annotation.*;

@Configuration
@EnableMongoHttpSession
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository m_userRepository;

    @PostMapping("/registration")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        m_userRepository.save(user);

        String message;
        message = "Register successfully.";
        jsonObject.addProperty("message", message);

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    // TODO E - Login
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
        session.setAttribute("email", user.getEmail());

        String message;
        message = "Login successfully.";
        jsonObject.addProperty("message", message);

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }

    // TODO E - DELETE User

    // TODO E - Update password

    /*@PutMapping("/updateUserEmail")
    public ResponseEntity<String> updateUserEmail(@RequestParam("email") String email, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();
        User user = m_userRepository.findByEmail((String) session.getAttribute("email")).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEmail(email);
        m_userRepository.save(user);

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }*/

    @PutMapping("/updateUserPhoneNumber")
    public ResponseEntity<String> updateUserPhoneNumber(@RequestParam("phoneNumber") String phoneNumber, HttpServletRequest request) {
        // Check if user is logged in
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("Unauthorized");
        }

        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();
        User user = m_userRepository.findByEmail((String) session.getAttribute("email")).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPhoneNumber(phoneNumber);
        m_userRepository.save(user);

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
}

