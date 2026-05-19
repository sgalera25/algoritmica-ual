import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import BenchmarkVisualizer from './BenchmarkVisualizer';
import { API_ENDPOINTS } from "./Constantes";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Divider,
  Stack,
  Alert
} from "@mui/material";
import {
  Settings,
  PlayArrow,
  InfoOutlined,
  Input as InputIcon
} from "@mui/icons-material";

export default function Dashboard() {
  const [algoritmosInfo, setAlgoritmosInfo] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [algoritmoSeleccionado, setAlgoritmoSeleccionado] = useState("");
  const [resultado, setResultado] = useState(null);
  const [warmup, setWarmup] = useState(0);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlgoritmos = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.ALGORITMOS);
        setAlgoritmosInfo(res.data);
      } catch (err) {
        console.error("Error al cargar algoritmos:", err);
      }
    };
    fetchAlgoritmos();
  }, []);

  const tipos = [...new Set(algoritmosInfo.map(a => a.tipo))];
  const algoritmosFiltrados = tipoSeleccionado
    ? algoritmosInfo.filter(a => a.tipo === tipoSeleccionado)
    : algoritmosInfo;

  const algoritmoInfo = algoritmosInfo.find(a => a.nombre === algoritmoSeleccionado);
  const parsedParams = typeof algoritmoInfo?.parametros === "string"
    ? JSON.parse(algoritmoInfo.parametros)
    : algoritmoInfo?.parametros;

  useEffect(() => {
    if (!algoritmoInfo || !parsedParams) return;
    setWarmup(algoritmoInfo.warmup);
    const current = {};
    parsedParams.forEach(p => {
      current[p.nombre] = p.defaultValue ?? "";
    });
    setParams(current);
  }, [algoritmoInfo, parsedParams]);

  const handleEjecutar = async () => {
    setLoading(true);
    setResultado(null);
    try {
      const res = await api.post(API_ENDPOINTS.EJECUTAR, {
        algoritmo: algoritmoSeleccionado,
        warmup: warmup,
        parametros: params,
        measurement: algoritmoInfo?.measurement ?? 1
      });
      console.log('resultados ejecución:', res.data)
      setResultado(res.data);
    } catch (err) {
      console.error("Error ejecutando benchmark:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Settings color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight="bold" color="primary">
          Panel de Configuración
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              Selección de Algoritmo
            </Typography>
            <Stack spacing={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Tipo de Algoritmo</InputLabel>
                <Select
                  value={tipoSeleccionado}
                  label="Tipo de Algoritmo"
                  onChange={(e) => {
                    setTipoSeleccionado(e.target.value);
                    setAlgoritmoSeleccionado("");
                  }}
                >
                  <MenuItem value=""><em>Todos los tipos</em></MenuItem>
                  {tipos.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" disabled={!tipoSeleccionado}>
                <InputLabel>Algoritmo Específico</InputLabel>
                <Select
                  value={algoritmoSeleccionado}
                  label="Algoritmo Específico"
                  onChange={(e) => setAlgoritmoSeleccionado(e.target.value)}
                >
                  <MenuItem value=""><em>Selecciona uno...</em></MenuItem>
                  {algoritmosFiltrados.map(a => <MenuItem key={a.id} value={a.nombre}>{a.nombre}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel>Warmup (Iteraciones)</InputLabel>
                <Select
                  value={warmup}
                  label="Warmup (Iteraciones)"
                  onChange={(e) => setWarmup(Number(e.target.value))}
                >
                  {[0, 1, 2, 3, 5, 10].map(n => <MenuItem key={n} value={n}>{n} iteraciones</MenuItem>)}
                </Select>
              </FormControl>
            </Stack>
          </Paper>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            disabled={!algoritmoSeleccionado || loading}
            onClick={handleEjecutar}
            startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 3 }}
          >
            {loading ? "Procesando..." : "Ejecutar Benchmark"}
          </Button>
        </Grid>

        <Grid item xs={12} md={7}>
          {algoritmoInfo ? (
            <Stack spacing={3}>
              {/* Card de Información */}
              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', bgcolor: '#fcfcfc' }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <InfoOutlined color="primary" />
                    <Typography variant="h6" fontWeight="bold">Detalles del Algoritmo</Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Complejidad Teórica:</strong> {algoritmoInfo.complejidad}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {algoritmoInfo.descripcion}
                  </Typography>
                </CardContent>
              </Card>

              {/* Card de Parámetros Dinámicos */}
              {parsedParams?.length > 0 && (
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <InputIcon color="primary" />
                      <Typography variant="h6" fontWeight="bold">Parámetros de Entrada</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      {parsedParams.map(param => (
                        <Grid item xs={12} sm={6} key={param.nombre}>
                          <TextField
                            fullWidth
                            label={param.nombre}
                            type={param.tipo}
                            variant="filled"
                            value={params[param.nombre] ?? ""}
                            onChange={(e) => setParams({
                              ...params,
                              [param.nombre]: param.tipo === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value
                            })}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Stack>
          ) : (
            <Alert severity="info" sx={{ borderRadius: 4 }}>
              Selecciona un algoritmo para configurar los parámetros de medición.
            </Alert>
          )}
        </Grid>
      </Grid>

      {loading && (
        <Paper variant="outlined" sx={{ mt: 6, p: 6, textAlign: 'center', borderStyle: 'dashed', borderRadius: 4, bgcolor: '#f0f7ff' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            Motor JMH en ejecución
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analizando bytecode y midiendo tiempos de CPU...
          </Typography>
        </Paper>
      )}

      {resultado && !loading && (
        <Box sx={{ mt: 4 }}>
          <BenchmarkVisualizer data={resultado} />
        </Box>
      )}
    </Container>
  );
}