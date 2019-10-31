package br.unipampa.acg.upload;

public class StorageException extends RuntimeException {

    /**
     *Tratamento de exceções
     */
    private static final long serialVersionUID = 1L;

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}