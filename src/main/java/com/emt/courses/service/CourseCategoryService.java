package com.emt.courses.service;

import com.emt.courses.model.CourseCategory;

import java.util.List;
import java.util.Optional;

public interface CourseCategoryService {

    List<CourseCategory> getAllCategories();

    Optional<CourseCategory> getCategory(int categoryId);

    CourseCategory saveCategory(CourseCategory category);

    CourseCategory updateCategory(CourseCategory category);

    void deleteCategory(int categoryId);

}
