import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Container,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
    getAlgoritmos,
    crearAlgoritmo,
    actualizarAlgoritmo,
    eliminarAlgoritmo,
} from "../api/algoritmoApi";

import AlgoritmoList from "../components/algoritmos/AlgoritmoList";
import AlgoritmoForm from "../components/algoritmos/AlgoritmoForm";

import { algoritmoVacio } from "../models/algoritmo";

export default function AlgoritmosPage() {

    const [algoritmos, setAlgoritmos] = useState([]);

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState(algoritmoVacio);

    const cargar = async () => {
        const res = await getAlgoritmos();
        setAlgoritmos(res.data);
    };

    useEffect(() => {
        cargar();
    }, []);

    const handleNuevo = () => {
        setSelected(algoritmoVacio);
        setOpen(true);
    };

    const handleEditar = (algoritmo) => {
        setSelected(algoritmo);
        setOpen(true);
    };

    const handleEliminar = async (id) => {

        if (!window.confirm("¿Eliminar algoritmo?")) {
            return;
        }

        await eliminarAlgoritmo(id);

        cargar();
    };

    const handleGuardar = async (algoritmo) => {

        if (algoritmo.id) {
            await actualizarAlgoritmo(
                algoritmo.id,
                algoritmo
            );
        } else {
            await crearAlgoritmo(algoritmo);
        }

        setOpen(false);

        cargar();
    };

    return (
        <Container maxWidth="xl">

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my={4}
            >
                <Typography variant="h4">
                    Algoritmos XML
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleNuevo}
                >
                    Nuevo
                </Button>
            </Box>

            <AlgoritmoList
                algoritmos={algoritmos}
                onEdit={handleEditar}
                onDelete={handleEliminar}
            />

            <AlgoritmoForm
                open={open}
                onClose={() => setOpen(false)}
                algoritmo={selected}
                onSave={handleGuardar}
            />

        </Container>
    );
}