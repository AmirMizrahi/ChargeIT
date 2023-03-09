package com.server.users;

public class UserNameAndPassword {

    private final String m_userName;
    private final String m_password;

    public UserNameAndPassword(String userName, String password) {
        this.m_userName = userName;
        this.m_password = password;
    }

    public String getUserName() {
        return m_userName;
    }

    public String getPassword() {
        return m_password;
    }
}

