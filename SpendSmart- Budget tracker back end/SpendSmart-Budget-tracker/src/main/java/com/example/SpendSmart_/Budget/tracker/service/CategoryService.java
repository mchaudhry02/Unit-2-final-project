package com.example.SpendSmart_.Budget.tracker.service;

import com.example.SpendSmart_.Budget.tracker.model.Category;
import com.example.SpendSmart_.Budget.tracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> update(Long id, Category updated) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setColor(updated.getColor());
            return categoryRepository.save(existing);
        });
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
