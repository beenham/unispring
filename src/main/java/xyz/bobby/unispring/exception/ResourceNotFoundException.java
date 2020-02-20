package xyz.bobby.unispring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends Exception {
	public ResourceNotFoundException(String type, int id) {
		super(String.format("%s[id=%d] not found", type, id));
	}

	public ResourceNotFoundException(String type, String format, Object... args) {
		super(String.format("%s[%s] not found", type, String.format(format, args)));
	}
}
