package com.fairshare.fairshare.service.serviceImplementation;

import com.fairshare.fairshare.model.User;
import com.fairshare.fairshare.repository.UserRepo;
import com.fairshare.fairshare.service.UserService;
import com.fairshare.fairshare.dto.UserDTO;

@Service //marking this as a service class so spring can manage it
public class UserServiceImp implements UserService {
    
    @Autowired
    private UserRepo userRepo; //automatically inject the user repo dependency

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(UserRegDTO regUser){
        String hashedPassword = passwordEncoder.encode(regUser.getPassword()); // hash plaintext password user sent in
        regUser.setPassword(hashedPassword); //set the newly hashed password as the password for the reg user object that was created

        User newUser = mapToEntityFromReg(regUser); //map the reguser object to a user object so it can be saved in database
        userRepo.save(newUser); //add new user in the database

        return mapToDTOfromReg(regUser); //return userDTO
    }

    @Override
    public UserDTO updateEmail(String userName, String newEmail){
        User userToUpdate = findByuserName(userName).orElseThrow(() -> new IllegalArgumentException("User not found"));
        userToUpdate.setEmailAddr(newEmail);
        userRepo.save(userToUpdate);
        
        return mapToDTO(userToUpdate);
    }

    @Override
    public UserDTO updatePassword(String newPassword, String userName){
        User userToUpdate = findByuserName(userName).orElseThrow(() -> new IllegalArgumentException("User not found"));
        String newlyHashedPassword = passwordEncoder.encode(newPassword);
        userToUpdate.setPassword(newlyHashedPassword);
        userRepo.save(userToUpdate);
        
        return mapToDTO(userToUpdate);
    }

    @Override
    public void updateProfilePic(String pathToNewUrl, String userName){
        User userToUpdate = findByuserName(userName).orElseThrow(() -> new IllegalArgumentException("User not found"));
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
    public UserDTO getUserByUserName(String userName) {

        // Implement the logic to get user by username
        User user = userRepo.findByUserName(userName)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Convert User entity to UserDTO (assuming you have a DTO mapper method)
        return mapToDTO(user);
    }

    //create method to map Entity to userDTO
    private UserDTO mapToDTO(User userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(userEntity.getuserName());
        userDTO.setFirstName(userEntity.getFirstName());
        userDTO.setLastName(userEntity.getLastName());
        userDTO.setEmailAddr(userEntity.getEmailAddr());
        userDTO.setProfilePicUrl(userEntity.getProfilePicUrl());

        return userDTO;
    }

        //create method to map Entity to userDTO from regDTO
        private UserDTO mapToDTOfromReg(regUserDTO regUser){
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(regUser.getuserName());
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
        user.setProfilePicUrl(userEntity.getProfilePicUrl());

        return user;
    }

     //create method to map userDTO to Entity from reg
     private User mapToEntityFromReg(regUserDTO regUser){
        User user = new User();
        user.setUserName(regUser.getUserName());
        user.setFirstName(regUser.getFirstName());
        user.setLastName(regUser.getLastName());
        user.setEmailAddr(regUser.getEmailAddr());
        user.setProfilePicUrl(regUser.getProfilePicUrl());
        user.setPasswordHash(regUser.getPassword());

        return user;
    }
}
