package com.practicas.algoritmica.service;

import com.practicas.algoritmica.model.Algoritmo;
import com.practicas.algoritmica.model.AlgoritmosWrapper;
import com.practicas.algoritmica.model.Parametro;

import jakarta.annotation.PostConstruct;
import jakarta.xml.bind.*;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AlgoritmoService {

    private final String XML_PATH =
            "src/main/resources/algoritmos.xml";

    private List<Algoritmo> algoritmosCache = new ArrayList<>();

    @PostConstruct
    public void init() {
        algoritmosCache = cargarDesdeArchivo();
    }

    // =========================
    // GET ALL
    // =========================

    public List<Algoritmo> getTodosLosAlgoritmos() {
        return algoritmosCache;
    }

    // =========================
    // GET BY ID
    // =========================

    public Algoritmo getPorId(int id) {
        return algoritmosCache.stream()
                .filter(a -> a.getId() == id)
                .findFirst()
                .orElse(null);
    }

    // =========================
    // CREATE
    // =========================

    public Algoritmo crear(Algoritmo algoritmo) {

        int nuevoId = algoritmosCache.stream()
                .mapToInt(Algoritmo::getId)
                .max()
                .orElse(0) + 1;

        algoritmo.setId(nuevoId);

        algoritmosCache.add(algoritmo);

        guardarEnArchivo();

        return algoritmo;
    }

    // =========================
    // UPDATE
    // =========================

    public Algoritmo actualizar(int id, Algoritmo algoritmoActualizado) {

        Optional<Algoritmo> optional = algoritmosCache.stream()
                .filter(a -> a.getId() == id)
                .findFirst();

        if (optional.isEmpty()) {
            return null;
        }

        Algoritmo existente = optional.get();

        existente.setNombre(algoritmoActualizado.getNombre());
        existente.setTipo(algoritmoActualizado.getTipo());
        existente.setClase(algoritmoActualizado.getClase());
        existente.setParametros(algoritmoActualizado.getParametros());
        existente.setComplejidad(algoritmoActualizado.getComplejidad());
        existente.setDescripcion(algoritmoActualizado.getDescripcion());
        existente.setWarmup(algoritmoActualizado.getWarmup());
        existente.setMeasurement(algoritmoActualizado.getMeasurement());
        existente.setForks(algoritmoActualizado.getForks());

        guardarEnArchivo();

        return existente;
    }

    // =========================
    // DELETE
    // =========================

    public boolean eliminar(int id) {

        boolean eliminado = algoritmosCache.removeIf(a -> a.getId() == id);

        if (eliminado) {
            guardarEnArchivo();
        }

        return eliminado;
    }

    // =========================
    // LOAD XML
    // =========================

    private List<Algoritmo> cargarDesdeArchivo() {

        try {

            JAXBContext context = JAXBContext.newInstance(
                    AlgoritmosWrapper.class,
                    Algoritmo.class,
                    Parametro.class
            );

            Unmarshaller unmarshaller = context.createUnmarshaller();

            File file = new File(XML_PATH);

            AlgoritmosWrapper wrapper =
                    (AlgoritmosWrapper) unmarshaller.unmarshal(file);

            return wrapper.getAlgoritmos();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // =========================
    // SAVE XML
    // =========================

    private void guardarEnArchivo() {

        try {

            JAXBContext context = JAXBContext.newInstance(
                    AlgoritmosWrapper.class,
                    Algoritmo.class,
                    Parametro.class
            );

            Marshaller marshaller = context.createMarshaller();

            marshaller.setProperty(
                    Marshaller.JAXB_FORMATTED_OUTPUT,
                    true
            );

            AlgoritmosWrapper wrapper = new AlgoritmosWrapper();

            wrapper.setAlgoritmos(algoritmosCache);

            marshaller.marshal(wrapper, new File(XML_PATH));

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    // =========================
    // GET BY NOMBRE
    // =========================
    public Algoritmo getPorNombre(String nombre) {
        if (nombre == null) return null;
        
        return algoritmosCache.stream()
                .filter(a -> nombre.equalsIgnoreCase(a.getNombre()))
                .findFirst()
                .orElse(null);
    }
    
}