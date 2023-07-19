package com.server.chargingStations;

import java.util.Date;

public class Review {
    private Date dateTime;
    private String reviewText;
    private int grade; // Should be between 1 to 5
    private String nickname;
    public Review(String reviewText, int grade, String nickname) {
        this.dateTime = new Date();
        this.reviewText = reviewText;
        this.setGrade(grade); // Ensure grade is between 1 to 5
        this.nickname = nickname;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public String getReviewText() {
        return reviewText;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        // Ensure the grade is between 1 to 5
        if (grade < 1) {
            this.grade = 1;
        } else if (grade > 5) {
            this.grade = 5;
        } else {
            this.grade = grade;
        }
    }
    public String getNickname() {
        return nickname;
    }
}

