package org.algoritmica.practica3;

public class DemoSubsecuenciaApp {
    public static void main(String[] args) {
        int[] datos = {-2, 11, -4, 13, -5, -2};
        for (String alg : new String[]{"FuerzaBruta", "Mejorado", "Lineal"}) {
            Subsecuencia s = new Subsecuencia(datos);
            switch (alg) {
                case "FuerzaBruta" -> s.SubsecuenciaFuerzaBruta();
                case "Mejorado"    -> s.SubsecuenciaMejorado();
                case "Lineal"      -> s.SubsecuenciaLineal();
            }
            System.out.printf("%-12s  suma=%d  primer=%d  ultimo=%d%n",
                alg, s.getSuma(), s.getPrimer(), s.getUltimo());
        }
    }
}
