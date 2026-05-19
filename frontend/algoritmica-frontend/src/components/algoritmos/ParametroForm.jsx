import {
  Box,
  Grid,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function ParametroForm({
  parametro,
  onChange,
  onDelete,
}) {

  const handle = (e) => {

    onChange({
      ...parametro,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>

      <Grid container spacing={2}>

        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={parametro.nombre}
            onChange={handle}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Tipo"
            name="tipo"
            value={parametro.tipo}
            onChange={handle}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Default"
            name="defaultValue"
            value={parametro.defaultValue}
            onChange={handle}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Min"
            name="minDefault"
            value={parametro.minDefault}
            onChange={handle}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Max"
            name="maxDefault"
            value={parametro.maxDefault}
            onChange={handle}
          />
        </Grid>

        <Grid item xs={1}>
          <TextField
            fullWidth
            label="Step"
            name="stepDefault"
            value={parametro.stepDefault}
            onChange={handle}
          />
        </Grid>

        <Grid item xs={1}>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <IconButton
              color="error"
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

        </Grid>

      </Grid>

    </Paper>
  );
}