// material-ui

import MainCard from 'components/cards/MainCard';
import Table from './table';
import usePaginate from './use-paginate';

const States = () => {
  const { items, paginate, setPage } = usePaginate();

  return (
    <MainCard title="Estados">
      <Table items={items} paginate={paginate} onChange={setPage} />
    </MainCard>
  );
};

export default States;
