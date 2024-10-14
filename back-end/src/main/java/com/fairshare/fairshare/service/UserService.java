package com.fairshare.fairshare.service;
import com.fairshare.fairshare.model.User;
import com.fairshare.fairshare.dto.userDTO.UserDTO;
import com.fairshare.fairshare.dto.userDTO.userLoginDTO;
import com.fairshare.fairshare.dto.userDTO.userRegDTO;



// defining crud methods to use for the user entity


public interface UserService {
    /**
     * add a user to the database
     * @param user
     */
    UserDTO createUser(userRegDTO user);

    /**
     * log a user in
     * @param user
     * @return
     */
    UserDTO loginUser(userLoginDTO user);

    /**
     * update a users email address
     * @param email
     */
    UserDTO updateEmail(String userName, String newEmail);

    /**
     * update a users password
     * @param password
     */
    UserDTO updateHashedPassword(String newPassword, String userName);

    /**
     * update a users profile pic
     * @param profilePicUrl
     */
    UserDTO updateProfilePic(String pathToNewUrl, String userName);

    /**
     * delete a user by their userID
     * @param ID
     */
    void deleteUserByUsername(String userName);



    /**
     * get a user by their id
     * @param ID
     * @return
     */
    UserDTO getUserByUserName(String userName);

    /*
     * get all groups a user is associated with
     */
    // List<GroupDTO> getGroupsByUserID(String userName);

    

}
