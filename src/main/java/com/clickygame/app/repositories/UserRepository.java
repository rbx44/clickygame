package com.clickygame.app.repositories;

import java.util.Optional;

import com.clickygame.app.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
	Page<User> findAllBy(Pageable pageable);
}