import { FunctionComponent, useCallback } from 'react';
import MainCard from 'components/cards/MainCard';
import Table from './table';
import usePaginate from './use-paginate';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { Button, Typography } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';

const AgenciesPage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { items, paginate, setPage, fetchItems } = usePaginate();
  const goToCreate = useCallback(() => {
    navigate('/agencies/create');
  }, [navigate]);

  return (
    <MainCard className={className} headerClass={'page-header'} title={
      <div className={'page-header'}>
        <Typography variant="h3" className={'title-header'}>Agencias</Typography>
        <Button
          color="primary"
          variant={'outlined'}
          onClick={goToCreate}
          startIcon={<IconCirclePlus />}
        >
          Crear
        </Button>
      </div>
    }>
      <Table items={items} paginate={paginate} onChange={setPage} fetchItems={fetchItems} />
    </MainCard>
  );
};

interface Props {
  className?: string;
}

export default styled(AgenciesPage)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
