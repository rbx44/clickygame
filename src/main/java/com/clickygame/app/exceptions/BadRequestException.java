package com.clickygame.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Required fields are missing")
public class BadRequestException extends Exception {
    private static final long serialVersionUID = 2286096435531843104L;

    public BadRequestException(String msg) {
        super(msg);
    }
}