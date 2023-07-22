package com.server.users;

import com.server.users.money.IsraeliCreditCard;
import com.server.users.money.MoneyTransaction;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private ObjectId id;

    /*@Id
    private final String userName;*/

    private String password;

    private String firstName;

    private String lastName;

    @Indexed(unique = true)
    private String email;

    //@Indexed(unique = true)
    private String phoneNumber;

    private IsraeliCreditCard israeliCreditCard;

    private List<MoneyTransaction> profits;

    private List<MoneyTransaction> payments;

    public User(String password,String email) {
        //this.userName = userName;
        this.password = password;
        this.firstName = "";
        this.lastName = "";
        this.email = email;
        this.phoneNumber = "";
        this.israeliCreditCard = null;
        this.profits = new ArrayList<>();
        this.payments = new ArrayList<>();
    }

    // Getters and setters

    //public String getUserName() {return userName;}
    public ObjectId getId() {
        return id;
    }

    public String getPassword() {return password;}

    public void setPassword(String password) { this.password = password;}

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

    public IsraeliCreditCard getIsraeliCreditCard() {
        return israeliCreditCard;
    }

    public void setIsraeliCreditCard(IsraeliCreditCard israeliCreditCard) {
        this.israeliCreditCard = israeliCreditCard;
    }

    public List<MoneyTransaction> getProfits() {
        return profits;
    }

    public void addProfit(MoneyTransaction transaction) {
        profits.add(transaction);
    }

    public List<MoneyTransaction> getPayments() {
        return payments;
    }

    public void addPayment(MoneyTransaction transaction) {
        payments.add(transaction);
    }
}