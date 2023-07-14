// material-ui

import MainCard from 'components/cards/MainCard';
import Table from './table';
import usePaginate from './use-paginate';
import { Button, Typography } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import { styled } from 'styled-components';
import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router';

const States: FunctionComponent<Prop> = ({ className }) => {
  const { items, paginate, setPage } = usePaginate();
  const navigate = useNavigate();

  const goToCreate = useCallback(() => {
    navigate('/managers/create')
  }, [navigate]);

  return (
    <MainCard className={className} headerClass={'encargados-header'} title={
      <div className={'encargados-header'}>
        <Typography variant="h3" className={'title-header'}>Encargados</Typography>
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
      <Table items={items} paginate={paginate} onChange={setPage} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(States)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .encargados-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

