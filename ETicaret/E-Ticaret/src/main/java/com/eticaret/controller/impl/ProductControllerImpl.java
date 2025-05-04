package com.eticaret.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eticaret.controller.IProductController;
import com.eticaret.dto.DtoProduct;
import com.eticaret.service.IProductService;

@RestController
@RequestMapping("/product")
public class ProductControllerImpl implements IProductController {

    @Autowired
    private IProductService productService;

    

    // Tüm ürünleri listeleme
    @Override
    @GetMapping("/list")
    public List<DtoProduct> getAllProducts() {
        return productService.getAllProducts();
    }

    @Override
    @PostMapping("/add")
    public DtoProduct addProduct(@RequestBody DtoProduct dtoProduct) {
        return productService.addProduct(dtoProduct);

    }

    @Override
    @GetMapping("/search")
    public List<DtoProduct> searchProductsByNameStartingWith(@RequestParam String prefix) {

        return productService.searchProductsByNameStartingWith(prefix);
    }

    @DeleteMapping("/delete")
    @Override
    public void deleteProductById(@RequestParam String id) {
        productService.deleteProductById(id);
    }

}
