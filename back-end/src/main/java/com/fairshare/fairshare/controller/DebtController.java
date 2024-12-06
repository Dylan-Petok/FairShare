package com.fairshare.fairshare.controller;

import com.fairshare.fairshare.dto.DebtDTO;
import com.fairshare.fairshare.service.DebtService;
import com.fairshare.fairshare.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
public class DebtController {

    @Autowired
    private DebtService debtService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/lender")
    public ResponseEntity<?> getDebtsByLender(@RequestHeader("Authorization") String token) {
        String lenderUserName = jwtUtil.extractUsername(token.substring(7));
        List<DebtDTO> debts = debtService.getDebtsByLender(lenderUserName);
        return ResponseEntity.ok(debts);
    }

    @GetMapping("/borrower")
    public ResponseEntity<?> getDebtsByBorrower(@RequestHeader("Authorization") String token) {
        String borrowerUserName = jwtUtil.extractUsername(token.substring(7));
        List<DebtDTO> debts = debtService.getDebtsByBorrower(borrowerUserName);
        return ResponseEntity.ok(debts);
    }

    @PostMapping("/settle/{debtID}")
    public ResponseEntity<?> settleDebt(@PathVariable Long debtID) {
        debtService.settleDebt(debtID);
        return ResponseEntity.ok("{\"message\": \"Debt settled successfully\"}");
    }
}