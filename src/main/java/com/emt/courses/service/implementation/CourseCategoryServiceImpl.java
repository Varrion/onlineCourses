package com.emt.courses.service.implementation;

import com.emt.courses.model.CourseCategory;
import com.emt.courses.repository.CourseCategoryRepository;
import com.emt.courses.service.CourseCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseCategoryServiceImpl implements CourseCategoryService {

    private final CourseCategoryRepository categoryRepository;

    public CourseCategoryServiceImpl(CourseCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CourseCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CourseCategory getCategory(int categoryId) {
        return categoryRepository.getOne(categoryId);
    }

    @Override
    public CourseCategory saveCategory(CourseCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public CourseCategory updateCategory(CourseCategory category) {
        CourseCategory editedCategory = getCategory(category.getId());
        editedCategory.setName(category.getName());
        editedCategory.setDescription(category.getDescription());

        return categoryRepository.save(editedCategory);
    }

    @Override
    public void deleteCategory(int categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
