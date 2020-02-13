package xyz.bobby.unispring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class NotLoggedInException extends Exception {
	public NotLoggedInException() {
		super("Not logged in");
	}
}
