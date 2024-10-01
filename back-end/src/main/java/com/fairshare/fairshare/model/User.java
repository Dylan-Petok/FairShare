package com.fairshare.fairshare.model;

import javax.persistence.*;

@Entity
public class User {
    @Id
    private String userName;
    private String firstName;
    private String lastName;
    private String emailAddr;
    private String password;
    @Column(nullable = true)
    private String profilePicUrl;

    public User(){
    }

    public User(String userName, String firstName, String lastName, String emailAddr, String password, String profilePicUrl){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddr = emailAddr;
        this.password = password;
        this.profilePicUrl = profilePicUrl;
    }

    public String getUserName(){
        return userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public String getEmailAddr(){
        return emailAddr;
    }

    public void setEmailAddr(String emailAddr){
        this.emailAddr = emailAddr;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getProfilePicUrl(){
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl){
        this.profilePicUrl = profilePicUrl;
    }

}
