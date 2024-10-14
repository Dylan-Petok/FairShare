package com.fairshare.fairshare.model;
import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(nullable = false, unique = true)
    private String userName;
    
    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String emailAddr;

    @Column(nullable = false)
    private String passwordHash;

    private String profilePicUrl;

    public User(){
    }

    public User(String userName, String firstName, String lastName, String emailAddr, String passwordHash, String profilePicUrl){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddr = emailAddr;
        this.passwordHash = passwordHash;
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

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public String getEmailAddr(){
        return emailAddr;
    }

    public void setEmailAddr(String emailAddr){
        this.emailAddr = emailAddr;
    }

    public String getPassword(){
        return passwordHash;
    }

    public void setPassword(String passwordHash){
        this.passwordHash = passwordHash;
    }

    public String getProfilePicUrl(){
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl){
        this.profilePicUrl = profilePicUrl;
    }

}
