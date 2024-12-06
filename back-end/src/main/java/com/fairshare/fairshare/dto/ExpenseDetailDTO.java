package com.fairshare.fairshare.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class ExpenseDetailDTO {
    private String expenseDesc;
    private Date expenseDate;
    private double totalAmount;
    private PaidByUserDTO paidByUser;
    private List<ParticipantDTO> participants;

    @Data
    public static class PaidByUserDTO {
        private String firstName;
        private String lastName;
    }

    @Data
    public static class ParticipantDTO {
        private String firstName;
        private String lastName;
        private double percentage;
        private double amountOwed;
    }
}