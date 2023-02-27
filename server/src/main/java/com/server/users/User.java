package com.server.users;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    private final String m_userName;

    private String m_password;

    private final String m_firstName;

    private final String m_lastName;

    private String m_email;

    private String m_phoneNumber;

    public User(String userName,String password, String firstName, String lastName, String email, String phoneNumber) {
        this.m_userName = userName;
        this.m_password = password;
        this.m_firstName = firstName;
        this.m_lastName = lastName;
        this.m_email = email;
        this.m_phoneNumber = phoneNumber;
    }

    // Getters and setters

    public String getUserName() {return m_userName;}

    public String getPassword() {return m_password;}

    public void setPassword(String password) { this.m_password = password;}

    public String getFirstName() {
        return m_firstName;
    }

    public String getLastName() {
        return m_lastName;
    }

    public String getEmail() {
        return m_email;
    }

    public void setEmail(String email) {
        this.m_email = email;
    }

    public String getPhoneNumber() {
        return m_phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.m_phoneNumber = phoneNumber;
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