package xyz.bobby.unispring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PAYMENT_REQUIRED)
public class FeesNotPaidException extends Exception {
	public FeesNotPaidException() {
		super("Fees not paid");
	}
}
