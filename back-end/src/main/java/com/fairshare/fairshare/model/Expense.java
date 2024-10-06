package com.fairshare.fairshare.model;

import com.fairshare.fairshare.model.User;

import javax.annotation.processing.Generated;
import javax.persistence.*;

import java.util.Set;
import java.util.HashSet;
import java.util.Date;



@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long expenseID;

    @Column(nullable = false)
    private String expenseName;
    private String expenseDesc;

    @Column(nullable = false)
    private double totalExpenseAmount;

    @Column(nullable = false)
    private Date expenseDate;

    @Column(nullable = false)
    private User paidByUser;

    @ManyToMany
    @JoinTable(
        name = "expense_members",
        joinColumns = @JoinColumn(name = "expenseID"),
        inverseJoinColumns = @JoinColumn(name = "userID")
    )

    private Set<User> usersIncludedInExpense = new HashSet<>();  // Users who are part of this expense

    public Expense(){

    }

    public Expense(String expenseName, String expenseDesc, double totalExpenseAmount, Date expenseDate, User paidByUser){
        this.expenseName = expenseName;
        this.expenseDesc = expenseDesc;
        this.totalExpenseAmount = totalExpenseAmount;
        this.expenseDate = expenseDate;
        this.paidByUser = paidByUser;
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

    public Set<User> getUsersIncludedInExpense(){
        return usersIncludedInExpense;
    }

    public void setUsersIncludedInExpense(Set<User> usersIncludedInExpense){
        this.usersIncludedInExpense = usersIncludedInExpense;
    }
}
