package com.eticaret.service;

import java.util.List;

import com.eticaret.dto.DtoProduct;

public interface IProductService {

    List<DtoProduct> getAllProducts();  // Tüm ürünleri getirme

    DtoProduct addProduct(DtoProduct dtoProduct);

    List<DtoProduct> searchProductsByNameStartingWith(String prefix); // Ürün ismine göre filtreleme

    void deleteProductById(String id);
}
