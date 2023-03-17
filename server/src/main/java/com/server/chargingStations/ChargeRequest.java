package com.server.chargingStations;

import com.server.GeoLocation;
import com.server.users.UserNameAndPassword;

public class ChargeRequest {
    private GeoLocation m_location;
    private UserNameAndPassword m_userNameAndPassword;

    public ChargeRequest(GeoLocation location, UserNameAndPassword userNameAndPassword) {
        this.m_location = location;
        this.m_userNameAndPassword = userNameAndPassword;
    }

    public GeoLocation getLocation() {
        return m_location;
    }

    public UserNameAndPassword getUserNameAndPassword() {
        return m_userNameAndPassword;
    }
}
