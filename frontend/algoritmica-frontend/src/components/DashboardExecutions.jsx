import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
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
  Alert,
  FormControlLabel,
  Switch
} from "@mui/material";
import {
  Settings,
  PlayArrow,
  InfoOutlined,
  Input as InputIcon,
  LineAxis
} from "@mui/icons-material";
import { BenchmarkVisualizerExecutions } from './BenchmarkVisualizerExecutions'

export default function DashboardExecutions() {
  const [algoritmosInfo, setAlgoritmosInfo] = useState([]);
  const [modoEjecucion, setModoEjecucion] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [algoritmoSeleccionado, setAlgoritmoSeleccionado] = useState("");
  const [resultados, setResultados] = useState([]);
  const [warmup, setWarmup] = useState(0);
  const [measurement, setMeasurement] = useState(0);
  const [forks, setForks] = useState(0);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [metricMode, setMetricMode] = useState('avgt');

  const [esRango, setEsRango] = useState(false);
  const [configRango, setConfigRango] = useState({ min: 0, max: 0, step: 0 });

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
    setMeasurement(algoritmoInfo.measurement);
    setForks(algoritmoInfo.forks);

    const current = {};
    parsedParams.forEach(p => {
      current[p.nombre] = p.defaultValue ?? "";
    });
    setParams(current);

    const primerParam = parsedParams[0];
    if (primerParam && primerParam.minDefault) {
      setConfigRango({
        min: Number(primerParam.minDefault),
        max: Number(primerParam.maxDefault),
        step: Number(primerParam.stepDefault)
      });
    } else {
      setConfigRango({ min: 1, max: 10, step: 1 });
    }
  }, [algoritmoInfo, parsedParams]);

  const handleEjecutar = async () => {
    setLoading(true);

    if (esRango) {
      setModoEjecucion("lote");
    } else {
      setModoEjecucion("simple");
    }

    const nuevosResultados = [];
    const claveParametro = Object.keys(params)[0];

    try {
      let listaValores = [];

      if (esRango) {
        const { min, max, step } = configRango;
        for (let i = min; i <= max; i += step) {
          listaValores.push(i);
        }
      } else {
        const valorUnico = Number(params[claveParametro]);

        if (!isNaN(valorUnico)) {
          listaValores = [valorUnico];
        }
      }

      for (let valor of listaValores) {
        const parametrosEnvio = { ...params, [claveParametro]: valor };
        console.log('Param: ', parametrosEnvio)

        const res = await api.post(API_ENDPOINTS.EJECUTAR, {
          algoritmo: algoritmoSeleccionado,
          warmup: warmup,
          parametros: parametrosEnvio,
          measurement: measurement,
          forks: forks,
          mode: metricMode
        });

        const jmhData = Array.isArray(res.data) ? res.data[0] : res.data;

        nuevosResultados.push({
          valorParametro: valor,
          rendimiento: jmhData.primaryMetric.score,

          paramsUsados: parametrosEnvio,
          score: jmhData.primaryMetric.score,
          scoreUnit: jmhData.primaryMetric.scoreUnit,
          scoreError: jmhData.primaryMetric.scoreError,
          scorePercentiles: jmhData.primaryMetric.scorePercentiles,

          raw: jmhData
        });
      }

      setResultados(nuevosResultados);

    } catch (err) {
      console.error("Error ejecutando lote de benchmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 6, px: { xs: 2, md: 4 } }}>
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
                <InputLabel>Warmup</InputLabel>
                <Select
                  value={warmup}
                  label="Warmup"
                  onChange={(e) => setWarmup(Number(e.target.value))}
                >
                  {[0, 1, 2, 3, 5, 10].map(n => <MenuItem key={n} value={n}>{n} iteraciones</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Measurement</InputLabel>
                <Select
                  value={measurement}
                  label="Measurement"
                  onChange={(e) => setMeasurement(Number(e.target.value))}
                >
                  {[0, 1, 2, 3, 5, 10].map(n => <MenuItem key={n} value={n}>{n} iteraciones</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Fork</InputLabel>
                <Select
                  value={forks}
                  label="Forks"
                  onChange={(e) => setForks(Number(e.target.value))}
                >
                  {[0, 1, 2, 3, 5, 10].map(n => <MenuItem key={n} value={n}>{n} reinicios</MenuItem>)}
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
            {loading
              ? modoEjecucion === "lote"
                ? "Procesando Lote..."
                : "Ejecutando Benchmark..."
              : "Ejecutar Benchmark"}
          </Button>
        </Grid>

        <Grid item xs={12} md={7}>
          {algoritmoInfo ? (
            <Stack spacing={3}>
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

              {parsedParams?.length > 0 && (
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <InputIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">Parámetros de Entrada</Typography>
                      </Stack>
                      <FormControlLabel
                        control={<Switch checked={esRango} onChange={(e) => setEsRango(e.target.value === 'true' || e.target.checked)} color="primary" />}
                        label="Modo Barrido (Rango)"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Modo de Medición:
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color={metricMode === 'avgt' ? 'primary' : 'text.secondary'}>
                          Tiempo (ms/op)
                        </Typography>
                        <Switch
                          checked={metricMode === 'thrpt'}
                          onChange={(e) => setMetricMode(e.target.checked ? 'thrpt' : 'avgt')}
                          color="primary"
                        />
                        <Typography variant="caption" color={metricMode === 'thrpt' ? 'primary' : 'text.secondary'}>
                          Rendimiento (ops/s)
                        </Typography>
                      </Stack>
                    </Box>

                    {esRango ? (
                      <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LineAxis fontSize="small" color="primary" /> Configuración del intervalo para el parámetro principal
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              label="Mínimo"
                              type="number"
                              value={configRango.min}
                              onChange={(e) => setConfigRango({ ...configRango, min: Number(e.target.value) })}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              label="Máximo"
                              type="number"
                              value={configRango.max}
                              onChange={(e) => setConfigRango({ ...configRango, max: Number(e.target.value) })}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              label="Paso (Step)"
                              type="number"
                              value={configRango.step}
                              onChange={(e) => setConfigRango({ ...configRango, step: Number(e.target.value) })}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {parsedParams.map(param => (
                          <Grid item xs={12} key={param.nombre}>
                            <TextField
                              fullWidth
                              label={`${param.nombre}`}
                              type="text"
                              variant="filled"
                              placeholder="Ej: 4, 10, 15, 20"
                              value={params[param.nombre] ?? ""}
                              onChange={(e) => setParams({
                                ...params,
                                [param.nombre]: e.target.value
                              })}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}
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
            {modoEjecucion === "lote"
              ? "Ejecución en lote (barrido de parámetros)"
              : "Ejecución individual del benchmark"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analizando bytecode y midiendo tiempos de CPU en bloque...
          </Typography>
        </Paper>
      )}

      {resultados.length > 0 && !loading && (
        <Box sx={{ mt: 4, width: '100%', overflow: 'hidden' }}>
          <BenchmarkVisualizerExecutions data={resultados} />
        </Box>
      )}
    </Container>
  );
}