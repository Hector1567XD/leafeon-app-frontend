import { FunctionComponent } from 'react';
// material-ui
import styled from 'styled-components';
import DynamicTable, { Header } from 'components/DynamicTable';
import { OrderProduct } from './types';

const OrderProductsList: FunctionComponent<Props>
  = ({ className, items, orderId, isParentUpdate }) =>
{

  const columnForParentId: Header<any>[] = [];
  if (orderId !== null && isParentUpdate) {
    columnForParentId.push({
      columnLabel: 'Orden',
      cellAlignment: 'left',
      onRender: (_: OrderProduct) => orderId
    });
  }

  return (
    <>
      <DynamicTable
        className={className}
        emptyState={
          <center className={'full-empty-state'}>
            <p>No hay productos en la orden</p>
          </center>
        }
        headers={[
          ...columnForParentId,
          {
            columnLabel: 'Description',
            fieldName: 'description',
            cellAlignment: 'left',
          },
          {
            columnLabel: 'Precio',
            fieldName: 'price',
            cellAlignment: 'left',
          },
          {
            columnLabel: 'Cantidad',
            fieldName: 'quantity',
            cellAlignment: 'left'
          },
        ]}
        rows={items}
      />
    </>
  );
};

interface Props {
  orderId?: number | null;
  className?: string;
  isParentUpdate?: boolean;
  items: OrderProduct[];
}

export default styled(OrderProductsList)`

  tr.disabled {
    opacity: 0.7;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #e9e9e9;
    cursor: not-allowed;
  }

  .full-empty-state {
    width: 100%;
  }
`;
