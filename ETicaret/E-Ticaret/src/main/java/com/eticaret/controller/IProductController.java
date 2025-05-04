package com.eticaret.controller;

import java.util.List;

import com.eticaret.dto.DtoProduct;

public interface IProductController {

    List<DtoProduct> getAllProducts();  // Tüm ürünleri listeleme

    DtoProduct addProduct(DtoProduct dtoProduct);

    List<DtoProduct> searchProductsByNameStartingWith(String prefix);

    void deleteProductById(String id); // Ürün silme işlemi için eklenen metod

}
