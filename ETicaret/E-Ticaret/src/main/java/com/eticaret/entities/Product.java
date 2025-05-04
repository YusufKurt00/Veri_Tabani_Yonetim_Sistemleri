package com.eticaret.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "products") // MongoDB koleksiyon adı
@Getter
@Setter
public class Product {

    @Id
    private String id;

    private String name;
    private double price;
    private String image;
}
