package br.sistema.sistemag2.anexo;

public class AnexoException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public AnexoException(String message) {
        super(message);
    }

    public AnexoException(String message, Throwable cause) {
        super(message, cause);
    }
}