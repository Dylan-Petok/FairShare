package com.fairshare.fairshare.service;

import com.fairshare.fairshare.dto.ExpenseDTO;
import com.fairshare.fairshare.dto.ExpenseCreationDTO;
import com.fairshare.fairshare.dto.ExpenseDetailDTO;
import com.fairshare.fairshare.dto.GroupMemberDTO;
import com.fairshare.fairshare.dto.GroupDTO;
import com.fairshare.fairshare.dto.ExpenseDetailDTO.ParticipantDTO;
import com.fairshare.fairshare.dto.ExpenseDetailDTO.PaidByUserDTO;
import com.fairshare.fairshare.model.Debt;
import com.fairshare.fairshare.model.Expense;
import com.fairshare.fairshare.model.ExpenseParticipant;
import com.fairshare.fairshare.model.Group;
import com.fairshare.fairshare.model.User;
import com.fairshare.fairshare.repository.GroupRepo;
import com.fairshare.fairshare.repository.UserRepo;
import com.fairshare.fairshare.repository.DebtRepo;
import com.fairshare.fairshare.repository.ExpenseParticipantRepo;
import com.fairshare.fairshare.repository.ExpenseRepo;
import com.fairshare.fairshare.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;
import java.util.Date;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GroupService {

    private static final Logger logger = LoggerFactory.getLogger(GroupService.class);


    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ExpenseParticipantRepo expenseParticipantRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired 
    private ExpenseRepo expenseRepo;

     @Autowired
    private DebtRepo debtRepo;


   public Group createGroup(Group group, String token) {
        
    String creatorUsername = jwtUtil.extractUsername(token);
        User creator = userRepo.findByUserName(creatorUsername);
        if (creator == null) {
            throw new IllegalArgumentException("Group creator not found");
        }

        Set<User> groupMembers = new HashSet<>();
        groupMembers.add(creator); // Add the group creator to the group

        for (User member : group.getGroupMembers()) {
            if (member.isGuest()) {
                User guest = new User();
                guest.setFirstName(member.getFirstName());
                guest.setLastName(member.getLastName());
                String cleanFirstName = member.getFirstName().trim();
                String cleanLastName = member.getLastName().trim();
                String guestUsername = (cleanFirstName + cleanLastName).replaceAll("\\s+", "_").toLowerCase() + "_guest";
                guest.setUserName(guestUsername);                
                guest.setGuest(true);
                userRepo.save(guest);
                groupMembers.add(guest);
                logger.info("Created and added guest user: userID={}, userName={}", guest.getUserID(), guest.getUserName());
            } else {
                User existingUser = userRepo.findByUserName(member.getUserName());
                if (existingUser != null) {
                    groupMembers.add(existingUser);
                } else{
                    logger.info("User could not be found in repo={}, userName={}", member.getFirstName());

                }
            }
        }

        group.setGroupMembers(groupMembers);
        return groupRepo.save(group);
    }

    public void addUserToGroup(String userName, Long groupID) {
        Optional<Group> group = groupRepo.findById(groupID);
        User user = userRepo.findByUserName(userName);
        if (group.isPresent() && user != null) {
            group.get().getGroupMembers().add(user);
            groupRepo.save(group.get());
        } else {
            throw new IllegalArgumentException("Group or User not found");
        }
    }

    public void addGuestToGroup(String firstName, String lastName, Long groupID) {
        Optional<Group> group = groupRepo.findById(groupID);
        if (group.isPresent()) {
            User guest = new User();
            guest.setFirstName(firstName);
            guest.setLastName(lastName);
            guest.setGuest(true);
            userRepo.save(guest);
            group.get().getGroupMembers().add(guest);
            groupRepo.save(group.get());
        } else {
            throw new IllegalArgumentException("Group not found");
        }
    }

    public void removeUserFromGroup(String userName, Long groupID) {
        Optional<Group> group = groupRepo.findById(groupID);
        User user = userRepo.findByUserName(userName);
        if (group.isPresent() && user != null) {
            group.get().getGroupMembers().remove(user);
            groupRepo.save(group.get());
        } else {
            throw new IllegalArgumentException("Group or User not found");
        }
    }

    public Group getGroupByID(Long groupID) {
        Optional<Group> group = groupRepo.findById(groupID);
        if (group.isPresent()) {
            return group.get();
        } else {
            throw new IllegalArgumentException("Group not found");
        }
    }

    @Transactional
    public List<GroupDTO> getGroupsByUser(String username) {
        logger.info("getGroupsByUser called with username={}", username);
        User user = userRepo.findByUserName(username);
        if (user == null) {
            logger.error("User not found for username={}", username);
            throw new IllegalArgumentException("User not found");
        }
        List<Group> groups = groupRepo.findByGroupMembersContaining(user);
        logger.info("Number of groups found for user {}: {}", username, groups.size());
        for (Group g : groups) {
        logger.info("Group found: groupID={}, groupName={}, memberCount={}", g.getGroupID(), g.getGroupName(), g.getGroupMembers().size());
        for (User member : g.getGroupMembers()) {
            logger.info("Member of groupID={}: userID={}, userName={}", g.getGroupID(), member.getUserID(), member.getUserName());
        }
    }

    List<GroupDTO> groupDTOs = groups.stream().map(this::convertToGroupDTO).collect(Collectors.toList());
    logger.info("GroupDTOs created, count={}", groupDTOs.size());
    return groupDTOs;
}

    public List<ExpenseDTO> getExpensesByGroup(Long groupId) {
        Optional<Group> group = groupRepo.findById(groupId);
        if (group.isPresent()) {
            List<Expense> expenses = expenseRepo.findByGroup(group.get());
            return expenses.stream().map(this::convertToDTO).collect(Collectors.toList());
        } else {
            throw new IllegalArgumentException("Group not found");
        }
    }

    public void addExpenseParticipant(Long expenseId, Long userId, double percentage) {
        Optional<Expense> expense = expenseRepo.findById(expenseId);
        Optional<User> user = userRepo.findById(userId);
        if (expense.isPresent() && user.isPresent()) {
            ExpenseParticipant participant = new ExpenseParticipant();
            participant.setExpense(expense.get());
            participant.setUser(user.get());
            participant.setPercentage(percentage);
            expenseParticipantRepo.save(participant);
        } else {
            throw new IllegalArgumentException("Expense or User not found");
        }
    }

    public ExpenseDetailDTO getExpenseDetails(Long expenseId) {
        Optional<Expense> expense = expenseRepo.findById(expenseId);
        if (expense.isPresent()) {
            Expense exp = expense.get();
            List<ExpenseParticipant> participants = expenseRepo.findParticipantsByExpenseId(expenseId);
            exp.setParticipants(new HashSet<>(participants));
            exp.getParticipants().forEach(participant -> {
                double amountOwed = exp.getTotalAmount() * participant.getPercentage() / 100;
                participant.setAmountOwed(amountOwed);
            });

            // Convert to DTO
            ExpenseDetailDTO expenseDetailDTO = new ExpenseDetailDTO();
            expenseDetailDTO.setExpenseDesc(exp.getExpenseDesc());
            expenseDetailDTO.setExpenseDate(exp.getExpenseDate());
            expenseDetailDTO.setTotalAmount(exp.getTotalAmount());

            PaidByUserDTO paidByUserDTO = new PaidByUserDTO();
            paidByUserDTO.setFirstName(exp.getPaidByUser().getFirstName());
            paidByUserDTO.setLastName(exp.getPaidByUser().getLastName());
            expenseDetailDTO.setPaidByUser(paidByUserDTO);

            List<ParticipantDTO> participantDTOs = exp.getParticipants().stream().map(participant -> {
                ParticipantDTO participantDTO = new ParticipantDTO();
                participantDTO.setFirstName(participant.getUser().getFirstName());
                participantDTO.setLastName(participant.getUser().getLastName());
                participantDTO.setPercentage(participant.getPercentage());
                participantDTO.setAmountOwed(participant.getAmountOwed());
                return participantDTO;
            }).collect(Collectors.toList());
             expenseDetailDTO.setParticipants(participantDTOs);

            return expenseDetailDTO;
        } else {
            throw new IllegalArgumentException("Expense not found");
        }
    }
        @Transactional
        private GroupDTO convertToGroupDTO(Group group) {
            GroupDTO groupDTO = new GroupDTO();
            groupDTO.setGroupID(group.getGroupID());
            groupDTO.setGroupName(group.getGroupName());
            groupDTO.setGroupDesc(group.getGroupDesc());
            groupDTO.setPictureUrl(group.getPictureUrl());

            List<String> usernames = group.getGroupMembers().stream()
                .map(User::getUserName)
                .collect(Collectors.toList());
            groupDTO.setUsernames(usernames);
            logger.info("GroupDTO from convertToGroupDTO  created: , usernames={}", groupDTO.getUsernames());
            return groupDTO;
        }
        private ExpenseDTO convertToDTO(Expense expense) {
            ExpenseDTO expenseDTO = new ExpenseDTO();
            expenseDTO.setExpenseID(expense.getExpenseID());
            expenseDTO.setExpenseName(expense.getExpenseName());
            expenseDTO.setExpenseDesc(expense.getExpenseDesc());
            expenseDTO.setTotalAmount(expense.getTotalAmount());
            expenseDTO.setExpenseDate(expense.getExpenseDate());
            expenseDTO.setPaidByUserName(expense.getPaidByUser().getUserName());
            return expenseDTO;
        }
        
        public Expense createExpense(ExpenseCreationDTO expenseData) {
            String expenseName = expenseData.getExpenseName();
            String expenseDesc = expenseData.getExpenseDesc();
            double totalAmount = Double.parseDouble(expenseData.getTotalAmount());
            String paidByUsername = expenseData.getPaidBy();
            long groupId = expenseData.getGroupId();
            Map<String, Double> participantsData = expenseData.getExpenseParticipants();
    
            User paidByUser = userRepo.findByUserName(paidByUsername);
            if (paidByUser == null) {
                throw new IllegalArgumentException("Paid by user not found");
            }
    
            Group group = groupRepo.findById(groupId).orElseThrow(() -> new IllegalArgumentException("Group not found"));
    
            Expense expense = new Expense();
            expense.setExpenseName(expenseName);
            expense.setExpenseDesc(expenseDesc);
            expense.setTotalAmount(totalAmount);
            expense.setPaidByUser(paidByUser);
            expense.setGroup(group);
            expense.setExpenseDate(new Date());
    
            Set<ExpenseParticipant> participants = new HashSet<>();
            for (Map.Entry<String, Double> entry : participantsData.entrySet()) {
                String username = entry.getKey();
                double percentage = entry.getValue();
    
                User user = userRepo.findByUserName(username);
                if (user == null) {
                    throw new IllegalArgumentException("User not found: " + username);
                }
    
                ExpenseParticipant participant = new ExpenseParticipant();
                participant.setExpense(expense);
                participant.setUser(user);
                participant.setPercentage(percentage);
                participant.setAmountOwed(totalAmount * percentage / 100);
                participants.add(participant);

                logger.info("Participant added: username={}, percentage={}, amountOwed={}", username, percentage, participant.getAmountOwed());

            }
    
            expense.setParticipants(participants);
            Expense savedExpense = expenseRepo.save(expense);
            createDebtsForExpense(savedExpense);
            return savedExpense;
        }

            private void createDebtsForExpense(Expense expense) {
        User paidByUser = expense.getPaidByUser();
        for (ExpenseParticipant participant : expense.getParticipants()) {
            if (!participant.getUser().equals(paidByUser)) {
                Debt debt = new Debt();
                debt.setDebtBorrower(participant.getUser());
                debt.setDebtLender(paidByUser);
                debt.setAmountOwed(participant.getAmountOwed());
                debt.setSettled(false);
                debt.setExpense(expense);
                debtRepo.save(debt);
            }
        }
    }

        
        public List<GroupMemberDTO> getGroupMembers(Long groupId) {
            List<User> members = groupRepo.findGroupMembersByGroupId(groupId);
            if (members.isEmpty()) {
                throw new IllegalArgumentException("Group not found or no members in the group");
            }
            logger.info("Group members found: {}", members);
            return members.stream().map(member -> {
                GroupMemberDTO memberDTO = new GroupMemberDTO();
                memberDTO.setUserID(member.getUserID());
                memberDTO.setUserName(member.getUserName());
                memberDTO.setProfilePicUrl(member.getProfilePicUrl());
                return memberDTO;
            }).collect(Collectors.toList());
        }

        
}




    