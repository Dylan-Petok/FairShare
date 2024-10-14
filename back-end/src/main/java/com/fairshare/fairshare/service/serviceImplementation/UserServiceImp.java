package com.fairshare.fairshare.service.serviceImplementation;

import com.fairshare.fairshare.model.User;
import com.fairshare.fairshare.repository.UserRepo;
import com.fairshare.fairshare.service.UserService;
import com.fairshare.fairshare.dto.userDTO.UserDTO;
import com.fairshare.fairshare.dto.userDTO.userLoginDTO;
import com.fairshare.fairshare.dto.userDTO.userRegDTO;
import org.springframework.security.crypto.password.PasswordEncoder;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Service //marking this as a service class so spring can manage it
public class UserServiceImp implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImp.class);

    
    @Autowired
    private UserRepo userRepo; //automatically inject the user repo dependency

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(userRegDTO regUser){
        if(userRepo.existsByUserName(regUser.getUserName())){
            throw new IllegalArgumentException("Username " + regUser.getUserName() + " is already taken");
        }

        if(userRepo.existsByEmailAddr(regUser.getEmailAddr())){
            throw new IllegalArgumentException("Email " + regUser.getEmailAddr() + " is already in use");
        }
        
        String hashedPassword = passwordEncoder.encode(regUser.getPassword()); // hash plaintext password user sent in
        regUser.setPassword(hashedPassword); //set the newly hashed password as the password for the reg user object that was created
        User newUser = mapToEntityFromReg(regUser); //map the reguser object to a user object so it can be saved in database
        userRepo.save(newUser); //add new user in the database

        return mapToDTOfromReg(regUser); //return userDTO
    }

    @Override
    public UserDTO loginUser(userLoginDTO logInDTO) {
        User user = userRepo.findByUserName(logInDTO.getUserName());

        String hashedLogInPassword = passwordEncoder.encode(logInDTO.getPassword());
        logger.debug("Hashed login password: {}", hashedLogInPassword);
        logger.debug("Stored user password: {}", user.getPassword());
        if(user == null){
            throw new IllegalArgumentException("Invalid username or password");
        }

        if(!passwordEncoder.matches(logInDTO.getPassword(), user.getPassword())){
            throw new IllegalArgumentException("Invalid username or password");
        }

        return mapToDTO(user);
    }


    @Override
    public UserDTO updateEmail(String userName, String newEmail){
        User userToUpdate = userRepo.findByUserName(userName);
        if(userToUpdate == null){
            throw new IllegalArgumentException("User not found");
        }
        userToUpdate.setEmailAddr(newEmail);
        userRepo.save(userToUpdate);
        
        return mapToDTO(userToUpdate);
    }

    @Override
    public UserDTO updateHashedPassword(String newPassword, String userName){
        User userToUpdate = userRepo.findByUserName(userName);
        if(userToUpdate == null){
            throw new IllegalArgumentException("User not found");
        }
        String newlyHashedPassword = passwordEncoder.encode(newPassword);
        userToUpdate.setPassword(newlyHashedPassword);
        userRepo.save(userToUpdate);
        
        return mapToDTO(userToUpdate);
    }

    @Override
    public UserDTO updateProfilePic(String pathToNewUrl, String userName){
        User userToUpdate = userRepo.findByUserName(userName);
        if(userToUpdate == null){
            throw new IllegalArgumentException("User not found");
        }
        userToUpdate.setProfilePicUrl(pathToNewUrl);
        userRepo.save(userToUpdate);
        
        return mapToDTO(userToUpdate);

    }
    @Override
    public void deleteUserByUsername(String userName){
        if(userRepo.existsByUserName(userName)){
            userRepo.deleteByUserName(userName);
        } else{
            throw new IllegalArgumentException("User not found");
        }
    }

    @Override
    public UserDTO getUserByUserName(String userName){

        // Implement the logic to get user by username
        User user = userRepo.findByUserName(userName);
        if(user == null){
            throw new IllegalArgumentException("User not found");
        }
        // Convert User entity to UserDTO
        return mapToDTO(user);
    }

    //create method to map Entity to userDTO
    private UserDTO mapToDTO(User userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(userEntity.getUserName());
        userDTO.setFirstName(userEntity.getFirstName());
        userDTO.setLastName(userEntity.getLastName());
        userDTO.setEmailAddr(userEntity.getEmailAddr());
        userDTO.setProfilePicUrl(userEntity.getProfilePicUrl());

        return userDTO;
    }

        //create method to map Entity to userDTO from regDTO
        private UserDTO mapToDTOfromReg(userRegDTO regUser){
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(regUser.getUserName());
            userDTO.setFirstName(regUser.getFirstName());
            userDTO.setLastName(regUser.getLastName());
            userDTO.setEmailAddr(regUser.getEmailAddr());
            userDTO.setProfilePicUrl(regUser.getProfilePicUrl());
    
            return userDTO;
        }
    //create method to map userDTO to Entity
    private User mapToEntity(UserDTO userDTO){
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmailAddr(userDTO.getEmailAddr());
        user.setProfilePicUrl(userDTO.getProfilePicUrl());

        return user;
    }

     //create method to map userDTO to Entity from reg
     private User mapToEntityFromReg(userRegDTO regUser){
        User user = new User();
        user.setUserName(regUser.getUserName());
        user.setFirstName(regUser.getFirstName());
        user.setLastName(regUser.getLastName());
        user.setEmailAddr(regUser.getEmailAddr());
        user.setProfilePicUrl(regUser.getProfilePicUrl());
        user.setPassword(regUser.getPassword());

        return user;
    }
}
