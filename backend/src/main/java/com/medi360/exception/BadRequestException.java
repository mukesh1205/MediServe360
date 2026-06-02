package com.medi360.exception;

public class BadRequestException extends RuntimeException {
	public BadRequestException() {
		super();
	}
    private static final long serialVersionUID = 1L;

	public BadRequestException(String message) {
        super(message);
    }
}