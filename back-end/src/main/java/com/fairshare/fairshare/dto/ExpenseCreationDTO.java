package com.fairshare.fairshare.dto;

import lombok.Data;
import java.util.Map;

@Data
public class ExpenseCreationDTO {
    private String expenseName;
    private String expenseDesc;
    private String totalAmount;
    private String paidBy;
    private Long groupId;
    private Map<String, Double> expenseParticipants;
}