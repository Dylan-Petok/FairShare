package com.fairshare.fairshare.dto.userDTO;

public class userRegDTO {

    private String userName;
    private String firstName;
    private String lastName;
    private String emailAddr;
    private String profilePicUrl;
    private String password;
    
    //constructor with parameters
    public userRegDTO(String userName, String firstName, String lastName, String emailAddr, String profilePicUrl, String password){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddr = emailAddr;
        this.profilePicUrl = profilePicUrl;
        this.password = password;
    }


    // Getters and setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

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

    public String getEmailAddr() {
        return emailAddr;
    }

    public void setEmailAddr(String emailAddr) {
        this.emailAddr = emailAddr;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}


