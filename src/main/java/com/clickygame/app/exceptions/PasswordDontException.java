package com.clickygame.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Something went wrong") //reason vague on purpose
public class PasswordDontException extends Exception {
    private static final long serialVersionUID = 1L;

    public PasswordDontException(String msg) {
        super(msg);
    }
}