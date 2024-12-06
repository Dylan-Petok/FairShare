package com.fairshare.fairshare.service;

import com.fairshare.fairshare.model.User;
import com.fairshare.fairshare.dto.userDTO.UserDTO;
import com.fairshare.fairshare.dto.userDTO.userLoginDTO;
import com.fairshare.fairshare.dto.userDTO.userRegDTO;
import com.fairshare.fairshare.repository.UserRepo;
import com.fairshare.fairshare.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.stream.Collectors;
import java.util.List;
import java.util.Set;




@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public UserDTO createUser(userRegDTO user) {
        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPasswordHash(passwordEncoder.encode(user.getPassword()));
        newUser.setGuest(false);
        userRepo.save(newUser);
        String token = jwtUtil.generateToken(newUser.getUserName());
        return new UserDTO(newUser, token);
    }

    public UserDTO createGuestUser(String firstName, String lastName) {
        User guestUser = new User();
        guestUser.setFirstName(firstName);
        guestUser.setLastName(lastName);
        guestUser.setGuest(true);
        userRepo.save(guestUser);
        return new UserDTO(guestUser);
    }

    public UserDTO loginUser(userLoginDTO user) {
        User existingUser = userRepo.findByUserName(user.getUserName());
        if (existingUser == null || !passwordEncoder.matches(user.getPassword(), existingUser.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        String token = jwtUtil.generateToken(existingUser.getUserName());
        return new UserDTO(existingUser, token);
    }

    public List<String> searchUsers(String query, String token, Set<String> excludeUsernames) {
        String currentUsername = jwtUtil.extractUsername(token);
        excludeUsernames.add(currentUsername); // Ensure the current user is also excluded
        Pageable pageable = PageRequest.of(0, 3); // Limit to 3 results
        List<User> users = userRepo.findTop3ByUserNameContainingIgnoreCaseAndNotIn(query, excludeUsernames.stream().collect(Collectors.toList()), pageable);
        return users.stream()
                .map(User::getUserName)
                .collect(Collectors.toList());
    }
}