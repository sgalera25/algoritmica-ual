package com.practicas.algoritmica.dto;

import java.util.Map;

public class BenchmarkRequest {
    private String algoritmo;
    private int warmup;
    private int measurement;
    private Map<String, Object> parametros;
    
    private String mode;
    
    private int forks;
    
	public String getAlgoritmo() {
		return algoritmo;
	}
	public void setAlgoritmo(String algoritmo) {
		this.algoritmo = algoritmo;
	}
	public int getWarmup() {
		return warmup;
	}
	public void setWarmup(int warmup) {
		this.warmup = warmup;
	}
	public int getMeasurement() {
		return measurement;
	}
	public void setMeasurement(int measurement) {
		this.measurement = measurement;
	}
	public Map<String, Object> getParametros() {
		return parametros;
	}
	public void setParametros(Map<String, Object> parametros) {
		this.parametros = parametros;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public int getForks() {
		return forks;
	}
	public void setForks(int forks) {
		this.forks = forks;
	}

	
 
}