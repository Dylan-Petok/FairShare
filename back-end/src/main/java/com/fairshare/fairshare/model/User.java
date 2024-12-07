package com.fairshare.fairshare.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    @Column(nullable = true, unique = true)
    private String userName;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = true, unique = true)
    private String email;

    @Column(nullable = true)
    private String passwordHash;

    private String profilePicUrl;

    @Column(nullable = false)
    private boolean isGuest;

    @ManyToMany(mappedBy = "groupMembers")
    @EqualsAndHashCode.Exclude
    private Set<Group> groups = new HashSet<>();

    @OneToMany(mappedBy = "paidByUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Expense> expensesPaid = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ExpenseParticipant> expenseParticipants = new HashSet<>();

    @OneToMany(mappedBy = "debtBorrower", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Debt> debtsBorrowed = new HashSet<>();

    @OneToMany(mappedBy = "debtLender", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Debt> debtsLent = new HashSet<>();
}