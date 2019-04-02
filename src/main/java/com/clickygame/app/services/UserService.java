package com.clickygame.app.services;

import com.clickygame.app.exceptions.BadRequestException;
import com.clickygame.app.exceptions.PasswordDontException;
import com.clickygame.app.exceptions.UserExistsException;
import com.clickygame.app.exceptions.UserNotFoundException;
import com.clickygame.app.models.User;

public interface UserService {

    User createUser(User createUser) throws UserExistsException, BadRequestException;
    User login(String email, String password) throws UserNotFoundException, BadRequestException, PasswordDontException;
    User updateUserTopScore(String userId, Integer topScore) throws UserNotFoundException;
    Iterable<User> getTopScorers(Integer number) throws BadRequestException;
    User getUserByEmail(String name) throws UserNotFoundException;
}