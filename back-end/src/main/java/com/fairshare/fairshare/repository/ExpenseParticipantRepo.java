package com.fairshare.fairshare.repository;

import com.fairshare.fairshare.model.ExpenseParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseParticipantRepo extends JpaRepository<ExpenseParticipant, Long> {
}