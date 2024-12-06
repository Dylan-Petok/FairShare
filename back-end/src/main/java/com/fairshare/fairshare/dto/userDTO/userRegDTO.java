package com.fairshare.fairshare.dto.userDTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class userRegDTO {
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String profilePicUrl;
    private String password;
}