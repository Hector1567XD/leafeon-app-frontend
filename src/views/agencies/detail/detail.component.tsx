import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Props } from './types';

const Detail: FunctionComponent<Props> = ({ className, agency, onRefresh }) => {
  return (
    <div className={className}>
      <div className={'container-form-services'}>
        <MainCard title={'Datos de la agencia'}>
          <TableContainer component={Paper}>
            <Table aria-label="Datos de agencia">
              <TableBody>
                <TableRow>
                  <TableCell>RIF Agencia:</TableCell>
                  <TableCell align="right">{agency.agencyRif}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nombre de agencia</TableCell>
                  <TableCell align="right">{agency.businessName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Id de Ciudad</TableCell>
                  <TableCell align="right">{agency.cityId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Creacion de agencia:</TableCell>
                  <TableCell align="right">{agency.createdAtFormatted}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nombre del Manager</TableCell>
                  <TableCell align="right">{agency.managerName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ciudad de agencia</TableCell>
                  <TableCell align="right">{agency.cityName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Estado de la agencia:</TableCell>
                  <TableCell align="right">{agency.stateName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </div>
    </div>
  );
};

export default Detail;
