package jsp.springbootfinal.error;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jsp.springbootfinal.dto.ResponseStructure;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(IdNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleIDNFE(IdNotFoundException exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.NOT_FOUND.value());
		res.setMessage(exp.getMessage());
		res.setData("Failure");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(NoRecordFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleNRFE(NoRecordFoundException exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.NOT_FOUND.value());
		res.setMessage(exp.getMessage());
		res.setData("Failure");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ResponseStructure<String>> handleDIVE(DataIntegrityViolationException exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.BAD_REQUEST.value());
		res.setMessage(exp.getMessage());
		res.setData("Failure");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<ResponseStructure<String>> handleISE(IllegalStateException exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.BAD_REQUEST.value());
		res.setMessage(exp.getMessage());
		res.setData("Failure");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(SecurityException.class)
	public ResponseEntity<ResponseStructure<String>> handleSecurityException(SecurityException exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.FORBIDDEN.value());
		res.setMessage(exp.getMessage());
		res.setData("Security violation");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ResponseStructure<String>> handleAccessDeniedException(AccessDeniedException exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.FORBIDDEN.value());
		res.setMessage("Access denied: You don't have permission to perform this action");
		res.setData("Access denied");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseStructure<String>> handleGenericException(Exception exp) {
		ResponseStructure<String> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		res.setMessage("An unexpected error occurred: " + exp.getMessage());
		res.setData("Server error");
		return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
