package com.fairshare.fairshare.model;

import java.lang.annotation.Inherited;

public class Debt {
    @ID 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long debtID;
    private User debtBorrower;
    private User debtLender; 
    private double amountOwed;
    private boolean isDebtSettled;


    public Debt(User debtBorrower, User debtLender, double amountOwed, boolean isDebtSettled){
        this.debtBorrower = debtBorrower;
        this.debtLender = debtLender;
        this.amountOwed = amountOwed;
        this.isDebtSettled = isDebtSettled;
    }

    public long getDebtID(){
        return debtID;
    }

    public User getDebtBorrower(){
        return debtBorrower;
    }

    public void setDebtBorrower(User debtBorrower){
        this.debtBorrower = debtBorrower;
    }

    public User getDebtLender(){
        return debtLender;
    }

    public void setDebtLender(User debtLender){
        this.debtLender = debtLender;
    }

    public double getAmountOwed(){
        return amountOwed;
    }

    public void setAmountOwed(double amountOwed){
        this.amountOwed = amountOwed;
    }

    public boolean isDebtSettled(){
        return isDebtSettled;
    }

    public void isDebtSettled(boolean isDebtSettled){
        this.isDebtSettled = isDebtSettled;
    }
}
