package com.fairshare.fairshare.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "expense_participants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "expenseid", nullable = false)
    private Expense expense;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    @Column(nullable = false)
    private double percentage;

    @Transient
    private double amountOwed;

}