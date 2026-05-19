import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, Box
} from '@mui/material';
import {
  PlayArrow
} from '@mui/icons-material';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 🚀 Hero Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        mb: 6,
        backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #43BFFF 90%)'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Benchmarking y Optimización
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Análisis empírico de complejidad y rendimiento sobre la JVM.
            Compara implementaciones mediante microbenchmarking.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<PlayArrow />}
            onClick={() => navigate('/dashboard')}
            sx={{ fontWeight: 'bold', borderRadius: 8, px: 4 }}
          >
            Iniciar Análisis
          </Button>
        </Container>
      </Box>
    </Box>
  );
}