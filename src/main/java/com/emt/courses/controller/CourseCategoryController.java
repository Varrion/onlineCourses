package com.emt.courses.controller;

import com.emt.courses.model.CourseCategory;
import com.emt.courses.service.CourseCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/category")
public class CourseCategoryController {

    private final CourseCategoryService categoryService;

    public CourseCategoryController(CourseCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    List<CourseCategory> getAllCourses() {
        return categoryService.getAllCategories();
    }

    @GetMapping(value = "{id}")
    CourseCategory getCategoryDetails(@PathVariable Integer id) {
        return categoryService.getCategory(id);
    }

    @PostMapping
    CourseCategory saveCategory(@RequestBody CourseCategory category) {
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/{id}")
    void deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
    }

    @PutMapping
    CourseCategory updateCategory(@RequestBody CourseCategory courseCategory) {
        return categoryService.updateCategory(courseCategory);
    }
}
