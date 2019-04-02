package com.clickygame.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "This user already exists")
public class UserExistsException extends Exception {
    private static final long serialVersionUID = 3824728739694115043L;

    public UserExistsException(String msg) {
        super(msg);
    }
}