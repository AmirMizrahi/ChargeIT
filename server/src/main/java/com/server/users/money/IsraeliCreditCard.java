package com.server.users.money;

import java.util.regex.Pattern;

public class IsraeliCreditCard {
    private String cardNumber;
    private String expirationDate;
    private int cvv;
    private String idNumber;

    public IsraeliCreditCard(String cardNumber, String expirationDate, int cvv, String idNumber) {
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
        this.idNumber = idNumber;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public int getCvv() {
        return cvv;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public boolean isValid() {
        return isValidCardNumber() && isValidExpirationDate() && isValidCvv() && isValidIdNumber();
    }

    private boolean isValidCardNumber() {
        // Check if the card number is not null and matches the expected pattern
        if (cardNumber == null || !Pattern.matches("^\\d{16}$", cardNumber)) {
            return false;
        }

        // Implement Luhn algorithm for card number validation
        int sum = 0;
        boolean doubleDigit = false;
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(cardNumber.charAt(i));
            if (doubleDigit) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            doubleDigit = !doubleDigit;
        }
        return sum % 10 == 0;
    }


    private boolean isValidExpirationDate() {
        // Check if the expiration date is not null and matches the expected pattern (MM/YY)
        if (expirationDate == null || !Pattern.matches("^(0[1-9]|1[0-2])/\\d{2}$", expirationDate)) {
            return false;
        }

        // Extract the month and year from the expiration date
        String[] parts = expirationDate.split("/");
        int month = Integer.parseInt(parts[0]);
        int year = Integer.parseInt(parts[1]);

        // Get the current month and year
        int currentMonth = java.time.LocalDate.now().getMonthValue();
        int currentYear = java.time.LocalDate.now().getYear() % 100;

        // Check if the card has not expired
        return year > currentYear || (year == currentYear && month >= currentMonth);
    }

    private boolean isValidCvv() {
        // Check if the CVV is a 3-digit number
        return cvv >= 100 && cvv <= 999;
    }

    private boolean isValidIdNumber() {
        // Check if the ID number is not null and matches the expected pattern (9 digits)
        return idNumber != null && Pattern.matches("^\\d{9}$", idNumber);
    }

}