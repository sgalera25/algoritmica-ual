package com.practicas.algoritmica.service;

import com.practicas.algoritmica.model.Algoritmo;
import com.practicas.algoritmica.model.AlgoritmosWrapper;
import com.practicas.algoritmica.model.Parametro;

import jakarta.annotation.PostConstruct;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Unmarshaller;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class AlgoritmoService1 {

    private List<Algoritmo> algoritmosCache = new ArrayList<>();

    @PostConstruct
    public void init() {
        this.algoritmosCache = cargarDesdeArchivo();
    }

    public List<Algoritmo> getTodosLosAlgoritmos() {
        return algoritmosCache;
    }

    public Algoritmo getPorId(int id) {
        return algoritmosCache.stream()
                .filter(a -> a.getId() == id)
                .findFirst()
                .orElse(null);
    }

    private List<Algoritmo> cargarDesdeArchivo() {
        try {
            ClassPathResource resource = new ClassPathResource("algoritmos.xml");

            if (!resource.exists()) {
                throw new RuntimeException("El archivo algoritmos.xml no existe en resources");
            }

            JAXBContext context = JAXBContext.newInstance(AlgoritmosWrapper.class, Algoritmo.class, Parametro.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();

            try (InputStream is = resource.getInputStream()) {

                AlgoritmosWrapper wrapper = (AlgoritmosWrapper) unmarshaller.unmarshal(is);

                List<Algoritmo> lista = wrapper.getAlgoritmos();
 
                return (lista != null) ? lista : new ArrayList<>();
            }

        } catch (JAXBException e) {
            throw new RuntimeException("Error de configuración JAXB", e);
        } catch (Exception e) {
            throw new RuntimeException("Error inesperado al cargar algoritmos", e);
        }
    }
    
    public Algoritmo getPorNombre(String nombre) {
        return algoritmosCache.stream()
                .filter(a -> a.getNombre().equalsIgnoreCase(nombre))
                .findFirst()
                .orElse(null);
    }
}