package com.server.chargingStations;

import com.server.GeoLocation;
import org.springframework.data.annotation.Id;

public class ChargingStationJson {
    @Id
    private final GeoLocation location;
    private final EchargerType chargerType;
    private Estatus status;
    private double pricePerVolt;

    public ChargingStationJson(GeoLocation location, double pricePerVolt, EchargerType chargerType) {
        this.location = location;
        this.chargerType = chargerType;
        status = Estatus.NOT_CHARGING;
        this.pricePerVolt = pricePerVolt;
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

    public void charge()
    {
        status = Estatus.CHARGING;
    }

    public void unCharge()
    {
        status = Estatus.NOT_CHARGING;
    }
}