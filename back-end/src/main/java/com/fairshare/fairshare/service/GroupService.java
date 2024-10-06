package com.fairshare.fairshare.service;
import com.fairshare.fairshare.model.Group;
import java.util.Set;
import java.util.HashSet;


//defining crud operations for group entity

public interface GroupService {
    /**
     * add a group to the database
     * @param group
     */
    void addGroup(Group group);
    /**
     * add a user to a group
     * @param userID
     * @param groupID
     */
    void addUserToGroup(String userID, Long groupID);
    /**
     * add an expense to a group
     * @param expenseID
     * @param groupID
     */
    void addExpenseToGroup(Long expenseID, Long groupID);
    /**
     * remove a group from the database
     * @param groupID
     */
    void removeGroup(Long groupID);
    /**
     * remove a user from a group
     * @param userName
     * @param groupID
     */
    void removeUserFromGroup(String userName, Long groupID);
    /**
     * remove an expense from a group
     * @param expenseID
     * @param groupID
     */
    void removeExpenseFromGroup(Long expenseID, Long groupID);
    /**
     * update the users in a group
     * @param users
     * @param groupID
     */
    // void updateUsersInGroup(List<User> users, Long groupID);
    /**
     * update expenses in a group
    //  * @param expenses
    //  * @param expenseID
     */
    // void updateExpensesInGroup(List<Expense> expenses, Long expenseID);


    /**
     * get a group by the group id
     * @param groupID
     * @return
     */
    Group getGroupByID(Long groupID);
    /**
     * get users in a group
     * @return
     */
   


}
