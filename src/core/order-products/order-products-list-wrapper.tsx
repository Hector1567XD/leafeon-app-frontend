import { FunctionComponent } from 'react';
// material-ui
import styled from 'styled-components';
import OrderActivitiesList from './order-products-list';
import MainCard from 'components/cards/MainCard';
import { OrderProduct } from './types';

const OrderProductsListWrapper: FunctionComponent<Props> = ({
  className, items
}) => {
  //const isCreated = !isUpdate;

  return (
    <>
      <MainCard className={className} headerClass={'page-header-container'}
        title={
          <div className={'page-header'}>
            <span>Productos de orden</span>
          </div>
        }
      >
        <OrderActivitiesList
          items={items}
        />
      </MainCard>
    </>
  );
};

interface Props {
  isParentUpdate?: boolean;
  className?: string;
  isUpdate?: boolean;
  items: OrderProduct[];
}

export default styled(OrderProductsListWrapper)`
  width: 100%;
  display: flex;
  
  margin-top: 15px; 
  flex-direction: column;

  .page-header-container {
    padding-bottom: 18.5px;
  }

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
