import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import ParametroForm from "./ParametroForm";

export default function AlgoritmoForm({
    open,
    onClose,
    algoritmo,
    onSave,
}) {

    const [form, setForm] = useState(algoritmo);

    useEffect(() => {
        setForm(algoritmo);
    }, [algoritmo]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const addParametro = () => {

        setForm({
            ...form,
            parametros: [
                ...form.parametros,
                {
                    nombre: "",
                    tipo: "",
                    defaultValue: "",
                    minDefault: "",
                    maxDefault: "",
                    stepDefault: "",
                },
            ],
        });
    };

    const updateParametro = (index, param) => {

        const nuevos = [...form.parametros];

        nuevos[index] = param;

        setForm({
            ...form,
            parametros: nuevos,
        });
    };

    const removeParametro = (index) => {

        setForm({
            ...form,
            parametros: form.parametros.filter(
                (_, i) => i !== index
            ),
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >

            <DialogTitle>
                {form.id ? "Editar" : "Nuevo"} Algoritmo
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Tipo"
                            name="tipo"
                            value={form.tipo}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Clase"
                            name="clase"
                            value={form.clase}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Descripción"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Complejidad"
                            name="complejidad"
                            value={form.complejidad}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Warmup"
                            name="warmup"
                            value={form.warmup}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Measurement"
                            name="measurement"
                            value={form.measurement}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Forks"
                            name="forks"
                            value={form.forks}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>

                <Typography mt={4} variant="h6">
                    Parámetros
                </Typography>

                {form.parametros?.map((p, index) => (
                    <ParametroForm
                        key={index}
                        parametro={p}
                        onChange={(param) =>
                            updateParametro(index, param)
                        }
                        onDelete={() => removeParametro(index)}
                    />
                ))}

                <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={addParametro}
                >
                    Añadir parámetro
                </Button>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={() => onSave(form)}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>
    );
}