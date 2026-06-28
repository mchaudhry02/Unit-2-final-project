package com.example.SpendSmart_.Budget.tracker.controller;

import com.example.SpendSmart_.Budget.tracker.model.Transaction;
import com.example.SpendSmart_.Budget.tracker.model.TransactionType;
import com.example.SpendSmart_.Budget.tracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<Transaction> getAll() {
        return transactionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getById(@PathVariable Long id) {
        return ResponseEntity.of(transactionService.findById(id));
    }

    @GetMapping("/category/{categoryId}")
    public List<Transaction> getByCategory(@PathVariable Long categoryId) {
        return transactionService.findByCategory(categoryId);
    }

    @GetMapping("/type/{type}")
    public List<Transaction> getByType(@PathVariable TransactionType type) {
        return transactionService.findByType(type);
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction transaction) {
        return transactionService.save(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable Long id, @RequestBody Transaction transaction) {
        return transactionService.update(id, transaction)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transactionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}