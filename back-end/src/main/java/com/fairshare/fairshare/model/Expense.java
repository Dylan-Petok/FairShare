package com.fairshare.fairshare.model;

import java.lang.annotation.Inherited;
import javax.persistence.*;


public class Expense {
    @ID 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long expenseID;
    private String expenseName;
    private String expenseDesc;
    private double totalExpenseAmount;
    private date expenseDate;
    private User paidByUser;
    private Map<User, Double> usersIncludedInExpense = new HashMap<>();


    public Expense(String expenseName, String expenseDesc, double totalExpenseAmount, date expenseDate, user paidByUser, Map<User, Double> usersIncludedInExpense){
        this.expenseName = expenseName;
        this.expenseDesc = expenseDesc;
        this.totalExpenseAmount = totalExpenseAmount;
        this.expenseDate = expenseDate;
        this.paidByUser = paidByUser;
        this.usersIncludedInExpense = usersIncludedInExpense;
    }

    public long getExpenseID(){
        return expenseID;
    }

    public String getExpenseName(){
        return expenseName;
    }

    public void setExpenseName(String expenseName){
        this.expenseName = expenseName;
    }

    public String getExpenseDesc(){
        return expenseDesc;
    }

    public void setExpenseDesc(String expenseDesc){
        this.expenseDesc = expenseDesc;
    }

    public double getTotalExpenseAmount(){
        return totalExpenseAmount;
    }

    public void setTotalExpenseAmount(double totalExpenseAmount){
        this.totalExpenseAmount = totalExpenseAmount;
    }

    public Date getExpenseDate(){
        return expenseDate;
    }

    public void setExpenseDate(Date expenseDate){
        this.expenseDate = expenseDate;
    }

    public User getPaidByUser(){
        return paidByUser;
    }

    public void setPaidByUser(User paidByUser){
        this.paidByUser = paidByUser;
    }

    public Set<User, Double> getUsersIncludedInExpense(){
        return usersIncludedInExpense;
    }

    public void setUsersIncludedInExpense(Map<User, Double> usersIncludedInExpense){
        this.usersIncludedInExpense = usersIncludedInExpense;
    }
}
