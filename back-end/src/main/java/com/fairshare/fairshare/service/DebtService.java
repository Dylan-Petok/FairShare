package com.fairshare.fairshare.service;

//defining crud operations for debt entity

public interface DebtService {
    /**
     * add a debt to the database
     * @param debt
     */
    void addDebt(Debt debt);
    /**
     * settle a debt
     * @param debtID
     */
    void settleDebt(Long debtID);
    /**
     * send a debt email
     * @param senderEmail
     * @param receiverEmail
     */
    void sendDebtEmail(String senderEmail, String receiverEmail);
    /**
     * delete a debt from the database
     * @param debtID
     */
    void deleteDebt(Long debtID);
    /**
     * update the amount owed
     * @param debtID
     * @param newAmount
     */
    void updateAmountOwed(Long debtID, double newAmount);


}
