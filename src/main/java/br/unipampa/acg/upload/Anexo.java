package br.unipampa.acg.upload;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;
import java.util.stream.Stream;

@Service
public abstract class Anexo implements AnexoService {

    private Path rootLocation;
    AnexoProperties properties;

    @Autowired
    public Anexo(AnexoProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.properties = properties;
    }

    @Override
    public String store(MultipartFile file, String nome) {
        properties.setLocation(nome);
        this.rootLocation = Paths.get(properties.getLocation());

        try {
            if (file.isEmpty()) {
                throw new StorageException("Falha ao salvar arquivo vazio" + file.getOriginalFilename());
            }
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new StorageException("Falha ao armazenar " + file.getOriginalFilename(), e);
        }

        return this.rootLocation.toString() + file.getOriginalFilename();
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(path -> this.rootLocation.relativize(path));
        } catch (IOException e) {
            throw new StorageException("Falha ao ler arquivos salvos", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageException("Não foi possível ler este arquivo: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageException("Não foi possível ler este arquivo: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Não foi possível inicializar", e);
        }
    }
}