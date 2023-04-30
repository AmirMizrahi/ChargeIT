package com.server.users;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private ObjectId id;

    /*@Id
    private final String userName;*/

    private String password;

    private String firstName;

    private String lastName;

    @Indexed(unique = true)
    private String email;

    //@Indexed(unique = true)
    private String phoneNumber;

    public User(String password,String email) {
        //this.userName = userName;
        this.password = password;
        this.firstName = "";
        this.lastName = "";
        this.email = email;
        this.phoneNumber = "";
    }

    // Getters and setters

    //public String getUserName() {return userName;}
    public ObjectId getId() {
        return id;
    }

    public String getPassword() {return password;}

    public void setPassword(String password) { this.password = password;}

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}