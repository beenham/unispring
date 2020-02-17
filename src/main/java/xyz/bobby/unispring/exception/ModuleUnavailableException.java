package xyz.bobby.unispring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import xyz.bobby.unispring.model.Module;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ModuleUnavailableException extends Exception {
	public ModuleUnavailableException(Module.Status status, int id) {
		super(String.format("Module[id=%d] is not available because module[id=%d] is %s", id, id, status));
	}
}
