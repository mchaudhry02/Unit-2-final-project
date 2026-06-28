package com.example.SpendSmart_.Budget.tracker.service;

import com.example.SpendSmart_.Budget.tracker.model.Transaction;
import com.example.SpendSmart_.Budget.tracker.model.TransactionType;
import com.example.SpendSmart_.Budget.tracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> findByCategory(Long categoryId) {
        return transactionRepository.findByCategoryId(categoryId);
    }

    public List<Transaction> findByType(TransactionType type) {
        return transactionRepository.findByType(type);
    }

    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> update(Long id, Transaction updated) {
        return transactionRepository.findById(id).map(existing -> {
            existing.setDescription(updated.getDescription());
            existing.setAmount(updated.getAmount());
            existing.setType(updated.getType());
            existing.setDate(updated.getDate());
            existing.setCategory(updated.getCategory());
            return transactionRepository.save(existing);
        });
    }

    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }
}
