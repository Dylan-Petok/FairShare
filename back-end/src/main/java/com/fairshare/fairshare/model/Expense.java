package com.fairshare.fairshare.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;
import java.util.HashSet;
import java.util.Objects;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expenseid")
    private long expenseID;

    @Column(nullable = false)
    private String expenseName;

    private String expenseDesc;

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private Date expenseDate;

    @ManyToOne
    @JoinColumn(name = "paid_by_user_id", nullable = false)
    private User paidByUser;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ExpenseParticipant> participants = new HashSet<>();

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Debt> debts = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Expense expense = (Expense) o;
        return expenseID == expense.expenseID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(expenseID);
    }
}