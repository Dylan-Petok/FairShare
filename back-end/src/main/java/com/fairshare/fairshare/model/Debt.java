package com.fairshare.fairshare.model;
import java.lang.annotation.Inherited;
import javax.annotation.processing.Generated;
import javax.persistence.*;


@Entity
@Table(name="debts")
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long debtID;

    @Column(nullable = false)
    private User debtBorrower;

    @Column(nullable = false)
    private User debtLender; 

    @Column(nullable = false)
    private double amountOwed;

    @Column(nullable = false)
    private boolean isDebtSettled;

    public Debt(){

    }
    
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
