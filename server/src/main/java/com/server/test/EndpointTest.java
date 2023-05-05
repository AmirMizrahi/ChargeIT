package com.server.test;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.google.gson.JsonObject;
import com.server.users.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class EndpointTest {

    @RequestMapping("/test/register")
    public ResponseEntity<String> register(@RequestBody User user, HttpServletRequest request){
        HttpStatus httpStatus = HttpStatus.OK;
        JsonObject jsonObject = new JsonObject();

        // Set user attributes in session
        HttpSession session = request.getSession(true);
        session.setAttribute("id", user.getId());

        jsonObject.addProperty("message", "Register successfully.");
        jsonObject.addProperty("token", session.getId());
        
        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonObject.toString());
    }
}