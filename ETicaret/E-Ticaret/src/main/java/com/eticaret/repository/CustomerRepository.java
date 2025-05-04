package com.eticaret.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eticaret.entities.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Email ile kullanıcıyı bulma
    Customer findByEmail(String email);
}
