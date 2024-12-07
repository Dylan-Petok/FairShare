package com.fairshare.fairshare.config;

import com.fairshare.fairshare.model.*;
import com.fairshare.fairshare.repository.*;
import com.fairshare.fairshare.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.*;

@Component
public class DataLoader {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private ExpenseParticipantRepo expenseParticipantRepo;

    @Autowired
    private DebtRepo debtRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostConstruct
    public void loadData() {
        clearDatabase();
        addDummyData();
    }

    private void clearDatabase() {
        debtRepo.deleteAll();
        expenseParticipantRepo.deleteAll();
        expenseRepo.deleteAll();
        groupRepo.deleteAll();
        userRepo.deleteAll();
    }

    private void addDummyData() {
        List<User> users = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            User user = new User();
            user.setUserName("user" + i);
            user.setFirstName("First" + i);
            user.setLastName("Last" + i);
            user.setEmail("user" + i + "@example.com");
            user.setPasswordHash(passwordEncoder.encode("password" + i));
            user.setGuest(false);
            users.add(user);
        }
        userRepo.saveAll(users);

        List<Group> groups = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Group group = new Group();
            group.setGroupName("Group" + i);
            group.setGroupDesc("Description for Group" + i);
            group.setPictureUrl("http://example.com/group" + i + ".png");
            group.setGroupMembers(new HashSet<>(users.subList((i - 1) * 3, i * 3)));
            groups.add(group);
        }
        groupRepo.saveAll(groups);

        List<Expense> expenses = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Expense expense = new Expense();
            expense.setExpenseName("Expense" + i);
            expense.setExpenseDesc("Description for Expense" + i);
            expense.setTotalAmount(100.0 * i);
            expense.setExpenseDate(new Date());
            expense.setPaidByUser(users.get(i - 1));
            expense.setGroup(groups.get((i - 1) % 3));
            expenses.add(expense);
        }
        expenseRepo.saveAll(expenses);

        List<ExpenseParticipant> participants = new ArrayList<>();
        for (Expense expense : expenses) {
            for (User user : expense.getGroup().getGroupMembers()) {
                ExpenseParticipant participant = new ExpenseParticipant();
                participant.setExpense(expense);
                participant.setUser(user);
                participant.setPercentage(33.33);
                participant.setAmountOwed(expense.getTotalAmount() * 33.33 / 100);
                participants.add(participant);
            }
        }
        expenseParticipantRepo.saveAll(participants);

        List<Debt> debts = new ArrayList<>();
        for (ExpenseParticipant participant : participants) {
            if (!participant.getUser().equals(participant.getExpense().getPaidByUser())) {
                Debt debt = new Debt();
                debt.setDebtBorrower(participant.getUser());
                debt.setDebtLender(participant.getExpense().getPaidByUser());
                debt.setAmountOwed(participant.getAmountOwed());
                debt.setSettled(false);
                debt.setExpense(participant.getExpense());
                debts.add(debt);
            }
        }
        debtRepo.saveAll(debts);
    }
}