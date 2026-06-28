package com.example.SpendSmart_.Budget.tracker.repository;

import com.example.SpendSmart_.Budget.tracker.model.Transaction;
import com.example.SpendSmart_.Budget.tracker.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCategoryId(Long categoryId);
    List<Transaction> findByType(TransactionType type);
}