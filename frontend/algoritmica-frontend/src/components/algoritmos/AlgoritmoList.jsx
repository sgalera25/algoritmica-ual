import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AlgoritmoList({
  algoritmos,
  onEdit,
  onDelete,
}) {

  return (
    <TableContainer component={Paper}>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Complejidad</TableCell>
            <TableCell>Warmup</TableCell>
            <TableCell>Measurement</TableCell>
            <TableCell>Forks</TableCell>
            <TableCell align="right">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {algoritmos.map((a) => (
            <TableRow key={a.id}>

              <TableCell>{a.id}</TableCell>
              <TableCell>{a.nombre}</TableCell>
              <TableCell>{a.tipo}</TableCell>
              <TableCell>{a.complejidad}</TableCell>
              <TableCell>{a.warmup}</TableCell>
              <TableCell>{a.measurement}</TableCell>
              <TableCell>{a.forks}</TableCell>

              <TableCell align="right">

                <IconButton
                  color="primary"
                  onClick={() => onEdit(a)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(a.id)}
                >
                  <DeleteIcon />
                </IconButton>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </TableContainer>
  );
}