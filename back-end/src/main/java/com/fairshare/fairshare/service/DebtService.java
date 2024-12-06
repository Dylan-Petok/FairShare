package com.fairshare.fairshare.service;

import com.fairshare.fairshare.dto.DebtDTO;
import com.fairshare.fairshare.model.Debt;
import com.fairshare.fairshare.repository.DebtRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DebtService {

    @Autowired
    private DebtRepo debtRepo;

    public List<DebtDTO> getDebtsByLender(String lenderUserName) {
        List<Debt> debts = debtRepo.findByDebtLenderUserName(lenderUserName);
        return debts.stream().map(this::convertToDTOForLender).collect(Collectors.toList());
    }

    public List<DebtDTO> getDebtsByBorrower(String borrowerUserName) {
        List<Debt> debts = debtRepo.findByDebtBorrowerUserName(borrowerUserName);
        return debts.stream().map(this::convertToDTOForBorrower).collect(Collectors.toList());
    }

    public void settleDebt(Long debtID) {
        Debt debt = debtRepo.findById(debtID).orElseThrow(() -> new IllegalArgumentException("Invalid debt ID"));
        debt.setSettled(true);
        debtRepo.save(debt);
    }

    private DebtDTO convertToDTOForLender(Debt debt) {
        DebtDTO debtDTO = new DebtDTO();
        debtDTO.setDebtID(debt.getDebtID());
        debtDTO.setOtherUserName(debt.getDebtBorrower().getUserName());
        debtDTO.setAmountOwed(debt.getAmountOwed());
        debtDTO.setSettled(debt.isSettled());
        debtDTO.setExpenseName(debt.getExpense().getExpenseName());
        debtDTO.setExpenseID(debt.getExpense().getExpenseID());
        debtDTO.setExpenseDate(debt.getExpense().getExpenseDate());
        debtDTO.setGroupName(debt.getExpense().getGroup().getGroupName());
        return debtDTO;
    }

    private DebtDTO convertToDTOForBorrower(Debt debt) {
        DebtDTO debtDTO = new DebtDTO();
        debtDTO.setDebtID(debt.getDebtID());
        debtDTO.setOtherUserName(debt.getDebtLender().getUserName());
        debtDTO.setAmountOwed(debt.getAmountOwed());
        debtDTO.setSettled(debt.isSettled());
        debtDTO.setExpenseName(debt.getExpense().getExpenseName());
        debtDTO.setExpenseID(debt.getExpense().getExpenseID());
        debtDTO.setExpenseDate(debt.getExpense().getExpenseDate());
        debtDTO.setGroupName(debt.getExpense().getGroup().getGroupName());
        return debtDTO;
    }
}