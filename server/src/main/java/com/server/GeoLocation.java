package com.server;
// TODO E - find an existing class for GeoLocation.
public class GeoLocation {
    private final double m_latitude;
    private final double m_longitude;

    public GeoLocation(double latitude, double longitude) {
        this.m_latitude = latitude;
        this.m_longitude = longitude;
    }

    public double getLatitude() {
        return m_latitude;
    }

    public double getLongitude() {
        return m_longitude;
    }
}
