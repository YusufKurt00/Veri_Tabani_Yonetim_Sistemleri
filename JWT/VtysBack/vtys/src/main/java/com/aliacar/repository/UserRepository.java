package com.aliacar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aliacar.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User save(User user);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    User findByEmailAndPassword(String email, String password);

    Optional<User> findByUsername(String fullName);
}
