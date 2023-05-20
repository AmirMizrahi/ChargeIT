package com.server.chargingStations;

import com.server.location.GeoLocation;
import org.springframework.data.annotation.Id;

public class ChargingStationJson {
    @Id
    private final GeoLocation location;
    private final EchargerType chargerType;
    private Estatus status;
    private double pricePerVolt;
    private String stationName;

    public ChargingStationJson(GeoLocation location, double pricePerVolt, EchargerType chargerType, String stationName) {
        this.location = location;
        this.chargerType = chargerType;
        status = Estatus.NOT_CHARGING;
        this.pricePerVolt = pricePerVolt;
        this.stationName = stationName;
    }

    public GeoLocation getLocation() {
        return location;
    }
    public EchargerType getChargerType() {
        return chargerType;
    }
    public Estatus getStatus() {
        return status;
    }
    public void setStatus(Estatus status) {
        this.status = status;
    }
    public double getPricePerVolt() {
        return pricePerVolt;
    }
    public void setPricePerVolt(double pricePerVolt) { this.pricePerVolt = pricePerVolt; }
    public String getStationName() {
        return stationName;
    }
    public void setStationName(String stationName) {
        this.stationName = stationName;
    }
    public void charge()
    {
        status = Estatus.CHARGING;
    }
    public void unCharge()
    {
        status = Estatus.NOT_CHARGING;
    }
}