package com.fairshare.fairshare.service;
import com.fairshare.fairshare.model.Expense;


//defining crud methods for the expense entity

public interface ExpenseService {
    /**
     * add expense to database
     * @param expense
     */
    void addExpense(Expense expense);
    /**
     * add user to expense
     * @param expenseID
     * @param userName
     * @param percentage
     */
    void addUserToExpense(Long expenseID, String userName, double percentage);
    /**
     * update user percentage in an expense
     * @param expenseID
     * @param userName
     */
    void updateUserPercentage(Long expenseID, String userName);
    /**
     * update the total amount in an expense
     * @param expenseID
     * @param amount
     */
    void updateAmount(Long expenseID, double amount);

    /**
     * delete an expense from database
     * @param expenseID
     */
    void deleteExpense(Long expenseID);
    /**
     * delete user from an expense
     * @param expenseID
     * @param userName
     */
    void deleteUserFromExpense(Long expenseID, String userName);
    /**
     * update the expense description
     * @param expenseID
     * @param desc
     */
    void updateExpenseDescription(Long expenseID, String desc);
    /**
     * get the participants and percentages of those involved in an expense
     * @return
     */

    


}
