import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import Detail from './detail';
import useReloadBillById from 'core/bills/use-reload-bill-by-id';
import useBillId from '../edit/use-bill-id';

const ModelDetail: FunctionComponent<Props> = ({className}) => {
  const orderId = useBillId();
  const { bill, reload } = useReloadBillById(orderId);

  if (!bill) return <></>;

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          { 'Factura ' + bill?.billId }
        </Typography>
      </MainCard>
      <Detail bill={bill} onRefresh={reload} />
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

