package com.eticaret.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eticaret.dto.DtoProduct;
import com.eticaret.entities.Product;
import com.eticaret.repository.ProductRepository;
import com.eticaret.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    // Tüm ürünleri getiren metod
    @Override
    public List<DtoProduct> getAllProducts() {
        List<Product> productList = productRepository.findAll();
        List<DtoProduct> dtoList = new ArrayList<>();

        if (productList.isEmpty()) {
            return dtoList; // Boş liste döndür
        }

        for (Product product : productList) {
            DtoProduct dtoProduct = new DtoProduct();
            BeanUtils.copyProperties(product, dtoProduct); // Her ürünü DTO'ya kopyala
            dtoList.add(dtoProduct);
        }

        return dtoList;
    }

    @Override
    public DtoProduct addProduct(DtoProduct dtoProduct) {
        Product product = new Product();
        BeanUtils.copyProperties(dtoProduct, product); // DTO'dan Entity'ye kopyala
        Product savedProduct = productRepository.save(product);
        DtoProduct savedDtoProduct = new DtoProduct();
        BeanUtils.copyProperties(savedProduct, savedDtoProduct); // Entity'den DTO'ya kopyala (ID vb. için)
        return savedDtoProduct;
    }

    @Override
    public List<DtoProduct> searchProductsByNameStartingWith(String prefix) {

        List<Product> productList = productRepository.findByNameStartingWithIgnoreCase(prefix);
        List<DtoProduct> dtoList = new ArrayList<>();
        if (productList.isEmpty()) {
            return dtoList; // Boş liste döndür
        }

        for (Product product : productList) {
            DtoProduct dtoProduct = new DtoProduct();
            BeanUtils.copyProperties(product, dtoProduct); // Her ürünü DTO'ya kopyala
            dtoList.add(dtoProduct);

        }
        return dtoList;
    }

    @Override
    public void deleteProductById(String id) {
        productRepository.deleteById(id);
    }
}
