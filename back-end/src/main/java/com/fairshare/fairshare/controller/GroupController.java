package com.fairshare.fairshare.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.fairshare.fairshare.dto.GroupDTO;
import com.fairshare.fairshare.model.Expense;
import com.fairshare.fairshare.model.Group;
import com.fairshare.fairshare.service.GroupService;
import com.fairshare.fairshare.utility.JwtUtil;
import com.fairshare.fairshare.dto.ExpenseCreationDTO;
import com.fairshare.fairshare.dto.ExpenseDTO;
import com.fairshare.fairshare.dto.ExpenseDetailDTO;
import com.fairshare.fairshare.dto.GroupMemberDTO;
import com.fairshare.fairshare.model.User;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Set;
import java.util.Map;





@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private GroupService groupService;

     @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/create")
    public ResponseEntity<?> createGroup(@RequestBody Group group, @RequestHeader("Authorization") String token){
        logger.info("Create group request received: {}", group);
        try{
            // Remove "Bearer " prefix from the token
            String jwtToken = token.substring(7);
            Group createdGroup = groupService.createGroup(group, jwtToken);
            logger.info("Group created successfully: {}", createdGroup.getGroupName());
            return ResponseEntity.status(HttpStatus.CREATED).body("Group created successfully");
        } catch(IllegalArgumentException ex){
            logger.info("Could not create group: {}", group.getGroupName());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @PostMapping("/{groupID}/addUser")
    public ResponseEntity<?> addUserToGroup(@PathVariable Long groupID, @RequestParam String userName){
        logger.info("Add user to group request received: groupID={}, userName={}", groupID, userName);
        try{
            groupService.addUserToGroup(userName, groupID);
            logger.info("User added to group successfully: groupID={}, userName={}", groupID, userName);
            return ResponseEntity.ok("{\"message\": \"User added to group successfully\"}");
        } catch(IllegalArgumentException ex){
            logger.info("Could not add user to group: groupID={}, userName={}", groupID, userName);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @PostMapping("/{groupID}/addGuest")
    public ResponseEntity<?> addGuestToGroup(@PathVariable Long groupID, @RequestParam String firstName, @RequestParam String lastName){
        logger.info("Add guest to group request received: groupID={}, firstName={}, lastName={}", groupID, firstName, lastName);
        try{
            groupService.addGuestToGroup(firstName, lastName, groupID);
            logger.info("Guest added to group successfully: groupID={}, firstName={}, lastName={}", groupID, firstName, lastName);
            return ResponseEntity.ok("{\"message\": \"Guest added to group successfully\"}");
        } catch(IllegalArgumentException ex){
            logger.info("Could not add guest to group: groupID={}, firstName={}, lastName={}", groupID, firstName, lastName);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{groupID}/removeUser")
    public ResponseEntity<?> removeUserFromGroup(@PathVariable Long groupID, @RequestParam String userName){
        logger.info("Remove user from group request received: groupID={}, userName={}", groupID, userName);
        try{
            groupService.removeUserFromGroup(userName, groupID);
            logger.info("User removed from group successfully: groupID={}, userName={}", groupID, userName);
            return ResponseEntity.ok("{\"message\": \"User removed from group successfully\"}");
        } catch(IllegalArgumentException ex){
            logger.info("Could not remove user from group: groupID={}, userName={}", groupID, userName);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @GetMapping("/{groupID}")
    public ResponseEntity<?> getGroupByID(@PathVariable Long groupID){
        logger.info("Get group by ID request received: groupID={}", groupID);
        try{
            Group group = groupService.getGroupByID(groupID);
            logger.info("Group retrieved successfully: groupID={}", groupID);
            return ResponseEntity.ok(group);
        } catch(IllegalArgumentException ex){
            logger.info("Could not retrieve group: groupID={}", groupID);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }
    @GetMapping("/user")
    public ResponseEntity<?> getUserGroups(@RequestHeader("Authorization") String token) {
        logger.info("Get user groups request received");
        try {
            // Remove "Bearer " prefix from the token
            String jwtToken = token.substring(7);
            String username = jwtUtil.extractUsername(jwtToken);
            List<GroupDTO> userGroups = groupService.getGroupsByUser(username);
            logger.info("Groups retrieved successfully for user: {}", username);
            for (GroupDTO group : userGroups) {
                logger.info("Group name: {}, Usernames: {}", group.getGroupName(), group.getUsernames());
            }
            return ResponseEntity.ok(userGroups);
        } catch (IllegalArgumentException ex) {
            logger.info("Could not retrieve groups for user");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }
    @PostMapping("/{groupId}/expenses")
    public ResponseEntity<?> createExpense(@PathVariable Long groupId, @RequestBody ExpenseCreationDTO expenseData, @RequestHeader("Authorization") String token) {
        logger.info("Create expense request received: {}", expenseData);
        try {
            // Remove "Bearer " prefix from the token
            String jwtToken = token.substring(7);
            expenseData.setGroupId(groupId);
            Expense createdExpense = groupService.createExpense(expenseData);
            logger.info("Expense created successfully: {}", createdExpense.getExpenseName());
            return ResponseEntity.status(HttpStatus.CREATED).body("Expense created successfully");
        } catch (IllegalArgumentException ex) {
            logger.info("Could not create expense: {}", expenseData.getExpenseName());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }


    @GetMapping("/{groupId}/expenses")
    public ResponseEntity<?> getExpensesByGroup(@PathVariable Long groupId, @RequestHeader("Authorization") String token) {
        logger.info("Get expenses by group request received: groupId={}", groupId);
        try {
            // Remove "Bearer " prefix from the token
            String jwtToken = token.substring(7);
            List<ExpenseDTO> expenses = groupService.getExpensesByGroup(groupId);
            logger.info("Expenses retrieved successfully for group: {}", groupId);
            logger.info("Expenses: {}", expenses); // Log the expenses
            return ResponseEntity.ok(expenses);
        } catch (IllegalArgumentException ex) {
            logger.info("Could not retrieve expenses for group: {}", groupId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }
    @GetMapping("/{groupId}/expenses/{expenseId}")
    public ResponseEntity<?> getExpenseDetails(@PathVariable Long groupId, @PathVariable Long expenseId, @RequestHeader("Authorization") String token) {
        logger.info("Get expense details request received: groupId={}, expenseId={}", groupId, expenseId);
        try {
            // Remove "Bearer " prefix from the token
            String jwtToken = token.substring(7);
            ExpenseDetailDTO expense = groupService.getExpenseDetails(expenseId);
            logger.info("Expense details retrieved successfully: expenseId={}", expenseId);
            logger.info("Expense: {}", expense); // Log the expense details
            return ResponseEntity.ok(expense);
        } catch (IllegalArgumentException ex) {
            logger.info("Could not retrieve expense details: groupId={}, expenseId={}", groupId, expenseId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<?> getGroupMembers(@PathVariable Long groupId, @RequestHeader("Authorization") String token) {
        logger.info("Get group members request received: groupId={}", groupId);
        try {
            // Remove "Bearer " prefix from the token
            String jwtToken = token.substring(7);
            List<GroupMemberDTO> members = groupService.getGroupMembers(groupId);
            logger.info("Group members retrieved successfully for group: {}", groupId);
            logger.info("Group members: {}", members);
            return ResponseEntity.ok(members);
        } catch (IllegalArgumentException ex) {
            logger.info("Could not retrieve group members for group: {}", groupId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"" + ex.getMessage() + "\"}");
        }
    }

}