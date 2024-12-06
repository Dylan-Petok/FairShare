package com.fairshare.fairshare.dto;

import lombok.Data;
import java.util.Date;

@Data
public class ExpenseDTO {
    private long expenseID;
    private String expenseName;
    private String expenseDesc;
    private double totalAmount;
    private Date expenseDate;
    private String paidByUserName;
}