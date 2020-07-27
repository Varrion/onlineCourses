package com.emt.courses.service.implementation;

import com.emt.courses.model.CourseCategory;
import com.emt.courses.repository.CourseCategoryRepository;
import com.emt.courses.service.CourseCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Optional<CourseCategory> getCategory(int categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public CourseCategory saveCategory(CourseCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public CourseCategory updateCategory(CourseCategory category) {

        Optional<CourseCategory> optionalCourseCategory = getCategory(category.getId());

        if (optionalCourseCategory.isPresent()) {
            CourseCategory editedCategory = optionalCourseCategory.get();
            editedCategory.setName(category.getName());
            editedCategory.setDescription(category.getDescription());

            return categoryRepository.save(editedCategory);
        }

        return null;
    }

    @Override
    public void deleteCategory(int categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
