package com.server.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    /*@Id
    private final String userName;*/

    private String password;

    private String firstName;

    private String lastName;

    @Id
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

// json example
/*{
  "userName": "JohnDoe",
  "password": "123456",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "phoneNumber": "0541098765"
}*/