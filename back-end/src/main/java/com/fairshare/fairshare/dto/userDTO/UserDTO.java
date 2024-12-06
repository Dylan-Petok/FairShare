package com.fairshare.fairshare.dto.userDTO;

import com.fairshare.fairshare.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String profilePicUrl;
    private String token;

     // Constructor that takes a User object
     public UserDTO(User user) {
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.profilePicUrl = user.getProfilePicUrl();
    
    }

    public UserDTO(User user, String token) {
        this(user);
        this.token = token;
    }
}