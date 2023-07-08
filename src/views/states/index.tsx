// material-ui

import MainCard from 'components/cards/MainCard';
import Table from './table';
import Loader from 'components/Loader';
import SmallToast, { Severity } from 'components/SmallToast';
import usePaginate from './use-paginate';

const States = () => {
  const { items, page, loading, paginate, error, setPage, setError } = usePaginate();

  return (
    <MainCard title="Estados">
      { loading && <Loader /> }
      <Table items={items} paginate={{
        ...paginate,
        page,
      }} onChange={setPage} />
      <SmallToast
        message={error}
        severity={Severity.Error}
        onClose={() => setError(null)}
      />
    </MainCard>
  );
};

export default States;
