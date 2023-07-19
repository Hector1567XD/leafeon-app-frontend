import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Props } from './types';
import OrderActivitiesCrud from 'core/order-activities/crud';
import useBookingById from 'core/bookings/use-booking-by-id';
import OrderProductsListWrapper from 'core/order-products/order-products-list-wrapper';

const Detail: FunctionComponent<Props> = ({ className, order, onRefresh }) => {

  const booking = useBookingById(order.bookingId);
  if (!booking) return <></>;
  return (
    <div className={className}>
      <div className={'container-form-services'}>
        <MainCard className={'form-data'} contentClass={'form-content'} title={'Datos del modelo'}>
          <TableContainer component={Paper}>
            <Table aria-label="Datos de modelo">
              <TableBody>
                <TableRow>
                  <TableCell>ID de Orden:</TableCell>
                  <TableCell align="right">{order.orderId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DNI Responsable retiro:</TableCell>
                  <TableCell align="right">{order.responsibleDni}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nombre responsable retiro:</TableCell>
                  <TableCell align="right">{order.responsibleName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de entrada:</TableCell>
                  <TableCell align="right">{order.entryTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de salida estimada:</TableCell>
                  <TableCell align="right">{order.estimatedDeparture}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de salida real:</TableCell>
                  <TableCell align="right">{order.realDeparture}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ID de reserva:</TableCell>
                  <TableCell align="right">{order.bookingId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DNI de Analista:</TableCell>
                  <TableCell align="right">{order.employeeDni}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de creacion:</TableCell>
                  <TableCell align="right">{order.createdAt}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
        <div className={'form-data activites-crud'}>
          <OrderActivitiesCrud
            orderId={order.orderId}
            onRefresh={onRefresh}
            booking={booking}
            items={order.orderActivities}
          />
          <OrderProductsListWrapper
            items={order.orderProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
