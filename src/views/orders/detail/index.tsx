import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import Detail from './detail';
import useOrderId from 'core/orders/use-order-id';
import useReloadOrderById from 'core/orders/use-reload-order-by-id';

const ModelDetail: FunctionComponent<Props> = ({className}) => {
  const orderId = useOrderId();
  const { order, reload } = useReloadOrderById(orderId);

  if (!order) return <></>;

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          { 'Detalle de orden ' + order.orderId }
        </Typography>
      </MainCard>
      <Detail order={order} onRefresh={reload} />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(ModelDetail)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

