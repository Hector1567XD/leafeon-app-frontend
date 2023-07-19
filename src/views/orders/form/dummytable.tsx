import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const headers = ['IdActividad', 'IdServicio', 'Dni responsable', '#'];

const rows: any[] = [];

const DummyTableComponent = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.idActividad}>
              <TableCell>{row.idActividad}</TableCell>
              <TableCell>{row.idServicio}</TableCell>
              <TableCell>{row.dniResponsable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br /><br />
      <div style={{ width: '100%' }}>
        <center>No hay ninguna actividad aun</center>
      </div>
    </TableContainer>
  );
};

export default DummyTableComponent;
