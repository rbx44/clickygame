package com.clickygame.app.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.clickygame.app.exceptions.BadRequestException;
import com.clickygame.app.exceptions.PasswordDontException;
import com.clickygame.app.exceptions.UserExistsException;
import com.clickygame.app.exceptions.UserNotFoundException;
import com.clickygame.app.models.User;
import com.clickygame.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User createUser) throws UserExistsException, BadRequestException {
        if (nullOrEmpty(createUser.getName()) || nullOrEmpty(createUser.getEmail())
                || nullOrEmpty(createUser.getPassword())) {
            throw new BadRequestException("name, email and password are required for user creation");
        }

        if (emailExist(createUser.getEmail())) {
            throw new UserExistsException("User exists with email- " + createUser.getEmail());
        }

        User user = new User(createUser.getName(), createUser.getEmail(), createUser.getPassword());
        user.setPassword(bCryptPasswordEncoder.encode(createUser.getPassword()));
        user.setUsername(user.getEmail());
        Set<String> roles = new HashSet<String>();
        roles.add("USER");
        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) throws UserNotFoundException, BadRequestException, PasswordDontException {
        if (nullOrEmpty(email) || nullOrEmpty(password)) {
            throw new BadRequestException("both email and password are required");
        }

        User user = getUserByEmail(email);
        if (!bCryptPasswordEncoder.matches(password, user.getPassword()))
            throw new PasswordDontException("password doesn't match");
        
        return user;
    }

    @Override
    public User getUserByEmail(String email) throws UserNotFoundException {
        if (!emailExist(email)) {
            throw new UserNotFoundException("User not found with email- " + email);
        }
        return userRepository.findByEmail(email).get();
    }

    @Override
    public Iterable<User> getTopScorers(Integer number) throws BadRequestException {
        if (number <= 0) {
            throw new BadRequestException("topScore number should be greater than 0");
        }
        return userRepository.findAllBy(PageRequest.of(0, number, new Sort(Sort.Direction.DESC, "topScore")))
                .getContent();
    }

    @Override
    public User updateUserTopScore(String userId, Integer topScore) throws UserNotFoundException {
        Optional<User> optuser = userRepository.findById(userId);
        if (optuser.isPresent()) {
            User u = optuser.get();
            u.setTopScore(topScore);
            return userRepository.save(u);
        } else {
            throw new UserNotFoundException("User not found with userId - " + userId);
        }
    }

    private boolean emailExist(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }

    private boolean nullOrEmpty(String value) {
        if (value == null || value.trim() == "") {
            return true;
        } else {
            return false;
        }
    }
}