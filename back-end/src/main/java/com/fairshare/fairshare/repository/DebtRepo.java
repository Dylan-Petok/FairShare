package com.fairshare.fairshare.repository;

import com.fairshare.fairshare.model.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DebtRepo extends JpaRepository<Debt, Long> {
    // Custom query method to find debts by borrower's username
    List<Debt> findByDebtBorrowerUserName(String userName);

    // Custom query method to find debts by lender's username
    List<Debt> findByDebtLenderUserName(String userName);

    // Custom query method to find debts by amount owed
    List<Debt> findByAmountOwed(double amountOwed);

    // Custom query method to find debts by settlement status
    List<Debt> findByIsSettled(boolean isSettled);
}