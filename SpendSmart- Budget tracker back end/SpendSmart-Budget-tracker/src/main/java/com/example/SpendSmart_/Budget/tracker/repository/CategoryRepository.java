package com.example.SpendSmart_.Budget.tracker.repository;

import com.example.SpendSmart_.Budget.tracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {}