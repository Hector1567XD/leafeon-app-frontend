import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Props } from './types';

const Detail: FunctionComponent<Props> = ({ className, agency, onRefresh }) => {
  return (
    <div className={className}>
      <div className={'container-form-services'}>
        <MainCard className={'form-data'} contentClass={'form-content'} title={'Datos de la agencia'}>
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
                  <TableCell>Ciudad de agencia</TableCell>
                  <TableCell align="right">{agency.cityId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Creacion de agencia:</TableCell>
                  <TableCell align="right">{agency.createdAt}</TableCell>
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
