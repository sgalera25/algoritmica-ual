import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#121212',
        color: 'white',
        py: 4,
        borderTop: '1px solid #333',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} — Herramienta de Benchmarking Experimental
          </Typography>

          <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.5)' }}>
            Powered by{' '}
            <Link href="https://mui.com/" target="_blank" color="primary" underline="hover" sx={{ color: '#90caf9' }}>MUI</Link>,{' '}
            <Link href="https://spring.io/projects/spring-boot" target="_blank" color="primary" underline="hover" sx={{ color: '#90caf9' }}>Spring Boot</Link> &{' '}
            <Link href="https://github.com/openjdk/jmh" target="_blank" color="primary" underline="hover" sx={{ color: '#90caf9' }}>JMH</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}