// material-ui

import MainCard from 'components/cards/MainCard';
import Table from './table/table';
import usePaginate from './use-paginate';
import { Button, FormControl, Typography } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import { styled } from 'styled-components';
import { FunctionComponent, ReactNode, useCallback, useState } from 'react';
import useAgenciesOptions from 'core/agencies/use-agencies-options';
import SelectField from 'components/SelectField';

const USE_AUTOCOMPLETES = false;

const StocksCrud: FunctionComponent<Prop> = ({ className, fixedAgencyRif, header }) => {
  const [agencyRif, setAgencyRif] = useState<string | null>(fixedAgencyRif);
  const { items, paginate, setPage, reload } = usePaginate({
    onlyForAgencyRif: fixedAgencyRif ?? agencyRif,
  });

  const [open, setOpen] = useState(false);

  const onOpenCreate = useCallback(() => {
    // Open Create Coordinator Modal
    setOpen(true);
  }, []);

  const onCloseCreate = useCallback(() => {
    setOpen(false)
  }, []);

  const agenciesOptions = useAgenciesOptions();
  const headerIsString = typeof header === 'string';

  return (
    <MainCard className={className} headerClass={'crud-header'} title={
      <div className={'crud-header'}>
        {headerIsString ? (
          <Typography variant="h3" className={'title-header'}>
            {header}
          </Typography>
        ) : header}
        <FormControl disabled={!!fixedAgencyRif} className={'field-form-header-container'}>
          <SelectField
            className="field-form-header"
            fullWidth={true}
            disabled={!!fixedAgencyRif}
            name="agencyRif"
            onChange={(e) => {
              console.log('--->', agencyRif)
              setAgencyRif(''+e.target.value!);
            }}
            label="Agencia"
            options={agenciesOptions}
            helperText={''}
            error={false}
            isAutocomplete={USE_AUTOCOMPLETES}
            value={agencyRif}
          />
        </FormControl>
        <Button
          color="primary"
          variant={'outlined'}
          onClick={onOpenCreate}
          startIcon={<IconCirclePlus />}
          size="small"
        >
          Crear
        </Button>
      </div>
    }>
      <Table
        items={items}
        paginate={paginate}
        onChange={setPage}
        openCreate={open}
        reload={reload}
        onCloseCreate={onCloseCreate}
        fixedAgencyRif={agencyRif}
        isFixedRif={!!fixedAgencyRif}
      />
    </MainCard>
  );
};

interface Prop {
  header?: string | ReactNode;
  className?: string;
  fixedAgencyRif: string | null;
}

export default styled(StocksCrud)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  .field-form-header-container {
    width: 300px;
  }

  .field-form-header {
    width: 300px;
  }

  .crud-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
