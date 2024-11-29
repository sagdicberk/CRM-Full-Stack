package com.sgdcbrk.crm.repository;

import com.sgdcbrk.crm.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<List<User>> findByEmailContainsIgnoreCaseOrUsernameContainingIgnoreCase(String email, String username);
}
