// material-ui

import MainCard from 'components/cards/MainCard';
import Table from './table';
import usePaginate from './use-paginate';
import { styled } from 'styled-components';
import { FunctionComponent } from 'react';

const AgencyEmployeeList: FunctionComponent<Prop> = ({ className, agencyRif }) => {
  const { items, paginate, setPage, fetchStates } = usePaginate(agencyRif);

  return (
    <MainCard className={className} headerClass={'estados-header'} title={
      <div className={'estados-header'}>
        Empleados
      </div>
    }>
      <Table items={items} paginate={paginate} onChange={setPage} fetchItems={fetchStates} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
  agencyRif: string | null;
}

export default styled(AgencyEmployeeList)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .estados-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

