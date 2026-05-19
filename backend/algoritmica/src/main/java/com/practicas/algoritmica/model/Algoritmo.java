package com.practicas.algoritmica.model;

import jakarta.xml.bind.annotation.*;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "algoritmo")
public class Algoritmo {

	 private int id;
	    private String nombre;
	    private String tipo;
	    private String clase;

	    @XmlElementWrapper(name = "parametros")
	    @XmlElement(name = "parametro")
	    private List<Parametro> parametros;

	    private String complejidad;
	    private String descripcion;

	    private int warmup;
	    private int measurement;
	    private int forks;
	    
	    private String timeUnit;

	    public Algoritmo() {}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getTipo() {
			return tipo;
		}

		public void setTipo(String tipo) {
			this.tipo = tipo;
		}

		public String getClase() {
			return clase;
		}

		public void setClase(String clase) {
			this.clase = clase;
		}

		public List<Parametro> getParametros() {
			return parametros;
		}

		public void setParametros(List<Parametro> parametros) {
			this.parametros = parametros;
		}

		public String getComplejidad() {
			return complejidad;
		}

		public void setComplejidad(String complejidad) {
			this.complejidad = complejidad;
		}

		public String getDescripcion() {
			return descripcion;
		}

		public void setDescripcion(String descripcion) {
			this.descripcion = descripcion;
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

		public int getForks() {
			return forks;
		}

		public void setForks(int forks) {
			this.forks = forks;
		}

		public String getTimeUnit() {
			return timeUnit;
		}

		public void setTimeUnit(String timeUnit) {
			this.timeUnit = timeUnit;
		}
		

}