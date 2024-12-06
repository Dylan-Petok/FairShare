package com.fairshare.fairshare.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.fairshare.fairshare.dto.userDTO.UserDTO;
import com.fairshare.fairshare.dto.userDTO.userRegDTO;
import com.fairshare.fairshare.dto.userDTO.userLoginDTO;
import com.fairshare.fairshare.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.Set;




@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody userRegDTO userRegDTO){
        logger.info("Register request received for user: {}", userRegDTO);
        try{
            UserDTO user = userService.createUser(userRegDTO);
            logger.info("Register successful for user: {}", userRegDTO.getUserName());
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch(IllegalArgumentException ex){
            logger.info("Could not register user: {}", userRegDTO.getUserName());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @PostMapping("/registerGuest")
    public ResponseEntity<?> registerGuestUser(@RequestParam String firstName, @RequestParam String lastName){
        logger.info("Register request received for guest user: {} {}", firstName, lastName);
        try{
            UserDTO guestUser = userService.createGuestUser(firstName, lastName);
            logger.info("Register successful for guest user: {} {}", firstName, lastName);
            return ResponseEntity.status(HttpStatus.CREATED).body(guestUser);
        } catch(IllegalArgumentException ex){
            logger.info("Could not register guest user: {} {}", firstName, lastName);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody userLoginDTO logInDTO){
        logger.info("Request received for user to log in : {}", logInDTO.getUserName());
        try{
            UserDTO user = userService.loginUser(logInDTO);
            logger.info("User logged in successfully : {}", logInDTO.getUserName());
            return ResponseEntity.ok(user);
        } catch(IllegalArgumentException ex){
            logger.info("User could not be logged in : {}", logInDTO.getUserName());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"User could not be logged in\"}");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<String>> searchUsers(@RequestParam String query, @RequestParam String exclude, @RequestHeader("Authorization") String token) {
        // Remove "Bearer " prefix from the token
        String jwtToken = token.substring(7);
        Set<String> excludeUsernames = Arrays.stream(exclude.split(",")).collect(Collectors.toSet());
        List<String> usernames = userService.searchUsers(query, jwtToken, excludeUsernames);
        return ResponseEntity.ok(usernames);
    }
}