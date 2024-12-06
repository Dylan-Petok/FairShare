package com.fairshare.fairshare.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "debts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long debtID;

    @ManyToOne
    @JoinColumn(name = "borrower_id", nullable = false)
    private User debtBorrower;

    @ManyToOne
    @JoinColumn(name = "lender_id", nullable = false)
    private User debtLender;

    @Column(nullable = false)
    private double amountOwed;

    @Column(nullable = false)
    private boolean isSettled;

    @ManyToOne
    @JoinColumn(name = "expense_id", nullable = false)
    private Expense expense;
}
