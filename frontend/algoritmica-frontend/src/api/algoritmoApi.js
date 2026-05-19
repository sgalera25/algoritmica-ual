
import api from '../axiosConfig';
import { API_ENDPOINTS } from '../components/Constantes';

// ======================================
// GET ALL
// ======================================

export const getAlgoritmos = () =>
  api.get(API_ENDPOINTS.ALGORITMOS);

// ======================================
// GET BY ID
// ======================================

export const getAlgoritmoById = (id) =>
  api.get(
    `${API_ENDPOINTS.ALGORITMOS}/${id}`
  );

// ======================================
// CREATE
// ======================================

export const crearAlgoritmo = (data) =>
  api.post(
    API_ENDPOINTS.ALGORITMOS,
    data
  );

// ======================================
// UPDATE
// ======================================

export const actualizarAlgoritmo =
  (id, data) =>
    api.put(
      `${API_ENDPOINTS.ALGORITMOS}/${id}`,
      data
    );

// ======================================
// DELETE
// ======================================

export const eliminarAlgoritmo = (id) =>
  api.delete(
    `${API_ENDPOINTS.ALGORITMOS}/${id}`
  );