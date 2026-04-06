package jsp.springbootfinal.error;

@SuppressWarnings("serial")
public class NoRecordFoundException extends RuntimeException {
	public NoRecordFoundException(String message) {
		super(message);

	}
}
