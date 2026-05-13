package org.algoritmica.practica3;

public class DemoMatrizApp {
    public static void main(String[] args) {
        int[][] datos = {
            {10, 4, 2, 3},
            {50, 40, 10, 20},
            {11, 10, 20, 0},
            {10, 2, 3, 5}
        };
        MatrizEnterosCuadrada original = new MatrizEnterosCuadrada(datos);
        System.out.println("Matriz original:");
        System.out.println(original);
        System.out.println("Matriz ordenada por filas:");
        System.out.println(original.matrizOrdenadaPorFilas());
    }
}
