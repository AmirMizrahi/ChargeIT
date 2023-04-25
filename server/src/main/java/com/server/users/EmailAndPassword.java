package com.server.users;

public class EmailAndPassword {

    private final String m_email;
    private final String m_password;

    public EmailAndPassword(String email, String password) {
        this.m_email = email;
        this.m_password = password;
    }

    public String getEmail() {
        return m_email;
    }

    public String getPassword() {
        return m_password;
    }
}

