import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import Table from './table';
import usePaginate from './use-paginate';

const CitiesPage: FunctionComponent = () => {
  const { cities, paginate, setPage } = usePaginate();

  return (
    <MainCard title="Ciudades">
      <Table items={cities} paginate={paginate} onChange={setPage} />
    </MainCard>
  );
};

export default CitiesPage;
