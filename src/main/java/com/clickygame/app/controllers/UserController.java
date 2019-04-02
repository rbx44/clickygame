package com.clickygame.app.controllers;

import java.nio.charset.Charset;
import java.util.Base64;

import com.clickygame.app.exceptions.BadRequestException;
import com.clickygame.app.exceptions.PasswordDontException;
import com.clickygame.app.exceptions.UserExistsException;
import com.clickygame.app.exceptions.UserNotFoundException;
import com.clickygame.app.models.User;
import com.clickygame.app.models.UserLoginResponse;
import com.clickygame.app.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public ResponseEntity<String> createUser(@RequestBody User registerUser)
            throws UserExistsException, BadRequestException, Exception {
        try {
            User user = userService.createUser(registerUser);
            return new ResponseEntity<String>(user.getId(), HttpStatus.CREATED);
        } catch (UserExistsException e) {
            throw e;
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody User user)
            throws UserNotFoundException, PasswordDontException, BadRequestException, Exception {
        try {
            User userInfo = userService.login(user.getEmail(), user.getPassword());
            String base64Token = Base64.getEncoder().encodeToString(
                    (userInfo.getUsername() + ":" + user.getPassword()).getBytes(Charset.forName("UTF-8")));
            UserLoginResponse userLoginResponse = new UserLoginResponse();
            userLoginResponse.setToken(base64Token);
            userLoginResponse.setUserId(userInfo.getId());

            return new ResponseEntity<UserLoginResponse>(userLoginResponse, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw e;
        } catch (PasswordDontException e) {
            throw e;
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/user/logout")
    public ResponseEntity logout() {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/user/topscorers/{number}")
    public Iterable<User> getTopScorers(@PathVariable Integer number) throws BadRequestException, Exception {
        try {
            return userService.getTopScorers(number);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/api/user/{id}/topscore/{topScore}")
    public ResponseEntity<User> updateUserTopScore(@PathVariable String id, @PathVariable Integer topScore)
            throws UserNotFoundException, Exception {
        try {
            User user = userService.updateUserTopScore(id, topScore);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }
}