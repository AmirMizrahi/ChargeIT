package com.server.users.money;

import java.util.Date;

public class MoneyTransaction {
    private double amount;
    private Date dateTime;

    public MoneyTransaction() {
        // Empty constructor required for deserialization
    }

    public MoneyTransaction(double amount) {
        this.amount = amount;
        this.dateTime = new Date();
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
}
