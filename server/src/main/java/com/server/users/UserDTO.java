package com.server.users;

public class UserDTO {

    /*private ObjectId id;*/

    /*@Id
    private final String userName;*/
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    public UserDTO(String firstName, String lastName, String email, String phoneNumber) {
        //this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    // Getters and setters

    //public String getUserName() {return userName;}
    /*public ObjectId getId() {
        return id;
    }*/

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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