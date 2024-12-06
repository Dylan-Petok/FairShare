package com.fairshare.fairshare.repository;

import com.fairshare.fairshare.model.Expense;
import com.fairshare.fairshare.model.ExpenseParticipant;
import com.fairshare.fairshare.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    List<Expense> findByGroup(Group group);

    @Query("SELECT ep FROM ExpenseParticipant ep WHERE ep.expense.expenseID = :expenseId")
    List<ExpenseParticipant> findParticipantsByExpenseId(Long expenseId);

}