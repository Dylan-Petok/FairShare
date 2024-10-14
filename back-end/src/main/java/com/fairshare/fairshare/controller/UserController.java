package com.fairshare.fairshare.controller;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.fairshare.fairshare.dto.*;
import com.fairshare.fairshare.dto.userDTO.UserDTO;
import com.fairshare.fairshare.dto.userDTO.userRegDTO;
import com.fairshare.fairshare.dto.userDTO.userLoginDTO;
import com.fairshare.fairshare.service.*;
import com.fairshare.fairshare.service.serviceImplementation.*;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;





@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserServiceImp UserServiceImp;

    //register a new user endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody userRegDTO userRegDTO){
        logger.info("Register request received for user: {}", userRegDTO);
        try{
            UserServiceImp.createUser(userRegDTO);
            logger.info("Register successful for user: {}", userRegDTO.getUserName());
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"User created successfully\"}");
        } catch(IllegalArgumentException ex){
            logger.info("Could not register user: {}", userRegDTO.getUserName());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
        }
    

    //login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody userLoginDTO logInDTO){
        logger.info("Request received for user to log in : {}", logInDTO.getUserName());
        try{
            UserDTO user = UserServiceImp.loginUser(logInDTO);
            logger.info("User logged in successfully : {}", logInDTO.getUserName());
            return ResponseEntity.ok(user);
        } catch(IllegalArgumentException ex){
            logger.info("User could not be logged in : {}", logInDTO.getUserName());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"User could not be logged in\"}");
        }
    }



}
