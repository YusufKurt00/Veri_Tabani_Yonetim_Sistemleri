package com.eticaret.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eticaret.entities.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByNameStartingWithIgnoreCase(String prefix);
}
