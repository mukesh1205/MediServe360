package com.medi360.DTO;

import java.time.LocalDateTime;

public class NotificationResponseDTO {

    private int    notificationID;
    private int    userID;
    private String message;
    private String category;
    private String status;
    private LocalDateTime createdDate;

    public int getNotificationID()                     { return notificationID; }
    public void setNotificationID(int id)              { this.notificationID = id; }
    public int getUserID()                             { return userID; }
    public void setUserID(int userID)                  { this.userID = userID; }
    public String getMessage()                         { return message; }
    public void setMessage(String message)             { this.message = message; }
    public String getCategory()                        { return category; }
    public void setCategory(String category)           { this.category = category; }
    public String getStatus()                          { return status; }
    public void setStatus(String status)               { this.status = status; }
    public LocalDateTime getCreatedDate()              { return createdDate; }
    public void setCreatedDate(LocalDateTime d)        { this.createdDate = d; }
}