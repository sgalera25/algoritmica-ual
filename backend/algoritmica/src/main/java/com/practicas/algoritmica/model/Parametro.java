package com.practicas.algoritmica.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;

@XmlAccessorType(XmlAccessType.FIELD)
public class Parametro {

    private String nombre;
    private String tipo;
    private String defaultValue;

 // Nuevos campos para el barrido de rangos
    private String minDefault;
    private String maxDefault;
    private String stepDefault;
    
    public Parametro() {}

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getDefaultValue() { return defaultValue; }
    public void setDefaultValue(String defaultValue) { this.defaultValue = defaultValue; }

	public String getMinDefault() {
		return minDefault;
	}

	public void setMinDefault(String minDefault) {
		this.minDefault = minDefault;
	}

	public String getMaxDefault() {
		return maxDefault;
	}

	public void setMaxDefault(String maxDefault) {
		this.maxDefault = maxDefault;
	}

	public String getStepDefault() {
		return stepDefault;
	}

	public void setStepDefault(String stepDefault) {
		this.stepDefault = stepDefault;
	}

}