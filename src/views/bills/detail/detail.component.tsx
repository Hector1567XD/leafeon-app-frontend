import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Props } from './types';
import InvoiceTable from 'components/InvoiceTable';

const Detail: FunctionComponent<Props> = ({ className, bill, onRefresh }) => {

  return (
    <div className={className}>
      <div className={'container-form-services'}>
        <MainCard className={'form-data'} contentClass={'form-content'} title={'Detalle'}>
          <InvoiceTable items={bill.items} discountPercentage={bill.discountValue}  />
        </MainCard>
      </div>
    </div>
  );
};

export default Detail;
