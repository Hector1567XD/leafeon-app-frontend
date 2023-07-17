import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Props } from './types';
import RecommendedServicesCrud from 'core/recommended-services/crud';

const Detail: FunctionComponent<Props> = ({ className, model, onRefresh }) => {
  return (
    <div className={className}>
      <div className={'container-form-services'}>
        <MainCard className={'form-data'} contentClass={'form-content'} title={'Datos del modelo'}>
          <TableContainer component={Paper}>
            <Table aria-label="Datos de modelo">
              <TableBody>
                <TableRow>
                  <TableCell>ID de modelo:</TableCell>
                  <TableCell align="right">{model.modelId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Descripción de modelo:</TableCell>
                  <TableCell align="right">{model.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marca:</TableCell>
                  <TableCell align="right">{model.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Año de modelo:</TableCell>
                  <TableCell align="right">{model.modelYear}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tipo de refrigeración:</TableCell>
                  <TableCell align="right">{model.refrigerantType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tipo de aceite de motor:</TableCell>
                  <TableCell align="right">{model.engineOilType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Caja de aceite:</TableCell>
                  <TableCell align="right">{model.oilBox}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad de asientos:</TableCell>
                  <TableCell align="right">{model.seatsQuantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Peso del vehículo:</TableCell>
                  <TableCell align="right">{model.modelKg}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Octanagea:</TableCell>
                  <TableCell align="right">{model.octane}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
        <div className={'form-data activites-crud'}>
          <RecommendedServicesCrud
            modelId={model.modelId}
            onRefresh={onRefresh}
            services={model.services}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
