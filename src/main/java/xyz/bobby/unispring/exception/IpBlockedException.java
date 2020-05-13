package xyz.bobby.unispring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class IpBlockedException extends Exception {
	public IpBlockedException() {
		super("IP address has been blocked due to too many incorrect login attempts");
	}
}
