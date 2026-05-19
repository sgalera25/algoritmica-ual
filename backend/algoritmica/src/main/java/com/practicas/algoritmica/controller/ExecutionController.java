package com.practicas.algoritmica.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.practicas.algoritmica.dto.BenchmarkRequest;
import com.practicas.algoritmica.model.Algoritmo;
import com.practicas.algoritmica.service.AlgoritmoService;
import com.practicas.algoritmica.service.BenchmarkService;

@RestController
@RequestMapping("/api/ejecutar")
public class ExecutionController {

    @Autowired
    private AlgoritmoService algoritmoService;

    @Autowired
    private BenchmarkService benchmarkService;

    @PostMapping
    public Map<String, Object> ejecutarBenchmark(@RequestBody BenchmarkRequest request) {
        try {
            String algoritmoNombre = request.getAlgoritmo();
            // Buscamos la configuración para saber qué clase testear
            Algoritmo config = algoritmoService.getPorNombre(algoritmoNombre);

            if (config == null) {
                return Map.of("estado", "ERROR", "mensaje", "Algoritmo no encontrado");
            }

            Map<String, Object> result = benchmarkService.runExternalJMH(
                    config.getClase(), 
                    request.getParametros(),
                    request.getWarmup(), 
                    request.getMeasurement(),
                    request.getForks(),
                    request.getMode(),
                    config.getTimeUnit()
            );

            result.put("algoritmo", algoritmoNombre);
            return result;

        } catch (Exception e) {
            return Map.of("estado", "ERROR", "mensaje", e.getMessage());
        }
    }    
}