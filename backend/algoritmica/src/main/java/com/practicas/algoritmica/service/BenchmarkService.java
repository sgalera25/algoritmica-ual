package com.practicas.algoritmica.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class BenchmarkService {
	
    @Value("${benchmark.jar-path}")
    private String jarPath;

    @Value("${benchmark.output-dir}")
    private String outputDir;
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, Object> runExternalJMH(String className, Map<String, Object> params, int warmup, int iterations,
    		int forks, String mode, String timeUnit) {
    	
        String resultFile = Paths.get(outputDir, "resultado_" + UUID.randomUUID() + ".json").toString();

        try {
            // Construir el comando dinámicamente
            List<String> command = new ArrayList<>();
            command.add("java");
            command.add("-jar");
            command.add(jarPath);
            
            command.add(className); 
            
            if (params != null) {
                params.forEach((key, value) -> {
                    command.add("-p");
                    command.add(key + "=" + value);
                });
            }

            // Parámetros de JMH
            command.add("-w"); command.add(String.valueOf(warmup));
            command.add("-i"); command.add(String.valueOf(iterations));
            command.add("-f"); command.add(String.valueOf(forks));
            
            // Configuración de salida JSON
            command.add("-rf"); command.add("json");
            command.add("-rff"); command.add(resultFile);
            
            // Configurar el modo de benchmark dinámicamente
            command.add("-bm"); 
            command.add(mode); // 'avgt' para tiempo o 'thrpt' para rendimiento

            // Si es tiempo, podemos fijar una unidad para facilitar la gráfica
            command.add("-tu");
            command.add(timeUnit);
            
            // Ejecutar el proceso
            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Leer la consola para debug
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line); 
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("El benchmark falló con código de salida: " + exitCode);
            }

            // Parsear y devolver el resultado
            return parseJMHResult(resultFile);

        } catch (Exception e) {
            throw new RuntimeException("Error en la ejecución del benchmark: " + e.getMessage(), e);
        }
    }

    private Map<String, Object> parseJMHResult(String filePath) {
        try {
            byte[] jsonData = Files.readAllBytes(Paths.get(filePath));
            
            List<Map<String, Object>> results = objectMapper.readValue(jsonData, 
                objectMapper.getTypeFactory().constructCollectionType(List.class, Map.class));
            
            if (!results.isEmpty()) {
                return results.get(0);
            }
            return Map.of("error", "No se encontraron resultados en el archivo JSON");
            
        } catch (Exception e) {
            return Map.of("error", "Error al leer el archivo de resultados: " + e.getMessage());
        }
    }
}