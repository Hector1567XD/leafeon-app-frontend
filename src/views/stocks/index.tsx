import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import StocksCrudComponent from 'core/stocks/crud'

const StocksCrud: FunctionComponent<Props> = ({ className }) => {
  return (
  <StocksCrudComponent
    header={'Inventario'}
    fixedAgencyRif={null}
  />);
};

interface Props {
  className?: string;
}

export default styled(StocksCrud)``;
