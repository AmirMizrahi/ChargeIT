package com.server.users;

import com.server.chargingStations.ChargingStationDTO;
import com.server.users.money.MoneyTransaction;
import java.util.List;

public class UserDTO {

    /*private ObjectId id;*/

    /*@Id
    private final String userName;*/
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private List<ChargingStationDTO> chargingStationDTOS;
    private boolean isValidIsraeliCreditCard;
    private List<MoneyTransaction> profits;
    private List<MoneyTransaction> payments;

    public UserDTO(String firstName, String lastName, String email, String phoneNumber, List<ChargingStationDTO> chargingStationDTOS,
                   boolean isValidIsraeliCreditCard, List<MoneyTransaction> profits, List<MoneyTransaction> payments) {
        //this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.chargingStationDTOS = chargingStationDTOS;
        this.isValidIsraeliCreditCard = isValidIsraeliCreditCard;
        this.profits = profits;
        this.payments = payments;
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

    public List<ChargingStationDTO> getChargingStationDTOS() {
        return chargingStationDTOS;
    }

    public void setChargingStationDTOS(List<ChargingStationDTO> chargingStationDTOS) {
        this.chargingStationDTOS = chargingStationDTOS;
    }

    public boolean isValidIsraeliCreditCard() {
        return isValidIsraeliCreditCard;
    }

    public void setValidIsraeliCreditCard(boolean validIsraeliCreditCard) {
        isValidIsraeliCreditCard = validIsraeliCreditCard;
    }

    public List<MoneyTransaction> getProfits() {
        return profits;
    }

    public void setProfits(List<MoneyTransaction> profits) {
        this.profits = profits;
    }

    public List<MoneyTransaction> getPayments() {
        return payments;
    }

    public void setPayments(List<MoneyTransaction> payments) {
        this.payments = payments;
    }
}