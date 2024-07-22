package com.example.demo.Repository;

import com.example.demo.Model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsernameAndDeleted(String username,String deleted);
    Optional<User> findByIdAndDeleted(int id, String deleted);
    boolean existsByTcAndDeleted(String tc,String deleted);
}
