package com.fairshare.fairshare.dto.userDTO;


public class userLoginDTO {
    private String userName;
    private String password;


public userLoginDTO(String userName, String password){
    this.userName = userName;
    this.password = password;
}

public void setUserName(String userName){
    this.userName = userName;
}

public String getUserName(){
    return userName;
}

public void setPassword(String password){
    this.password = password;
}

public String getPassword(){
    return password;
}

}
