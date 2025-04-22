package com.easyaccess.repository;

import com.easyaccess.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods here, e.g.:
    User findByUsername(String username);
    User findByEmail(String email);
}