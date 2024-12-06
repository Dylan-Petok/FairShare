package com.fairshare.fairshare.dto;

import lombok.Data;
import java.util.Date;

@Data
public class DebtDTO {
    private long debtID;
    private String otherUserName;
    private double amountOwed;
    private boolean settled;
    private String expenseName;
    private long expenseID;
    private Date expenseDate;
    private String groupName;
}