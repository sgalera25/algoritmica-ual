package com.practicas.algoritmica.model;

import java.util.List;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "algoritmos")
@XmlAccessorType(XmlAccessType.FIELD)
public class AlgoritmosWrapper {

    @XmlElement(name = "algoritmo")
    private List<Algoritmo> algoritmos;

    public List<Algoritmo> getAlgoritmos() {
        return algoritmos;
    }

    public void setAlgoritmos(List<Algoritmo> algoritmos) {
        this.algoritmos = algoritmos;
    }
}