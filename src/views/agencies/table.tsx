import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Agency } from 'core/agencies/types';
import styled from 'styled-components';
// Own
import { FunctionComponent } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange }) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <DynamicTable
            headers={[
                { columnLabel: 'RIF', fieldName: 'agencyRif', cellAlignment: 'left' },
                { columnLabel: 'Nombre', fieldName: 'businessName', cellAlignment: 'left' },
                { columnLabel: 'Manager DNI', fieldName: 'managerDni', cellAlignment: 'left' },
                { columnLabel: 'Ciudad', fieldName: 'cityId', cellAlignment: 'left' },
                { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
            ]}
            rows={items} components={[
                (row: Agency) =>
                <Button
                    color="primary"
                    onClick={() => { navigate('/agencies/edit/'+row.agencyRif) }}
                    startIcon={<IconEdit />}
                >
                    Editar
                </Button>,
                (row: Agency) =>
                <Button color="secondary" startIcon={<IconTrash />}>
                    Eliminar
                </Button>
            ]}
        />
            <div className={'paginator-container'}>
              <Pagination
                  count={paginate.pages}
                  page={paginate.page}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  onChange={(event, page) => { onChange(page) }}
              />
          </div>
        </div>
    );
}

interface Prop {
  items: Agency[];
  paginate: PaginateData;
  className?: string;
  onChange: (page: number) => void;
}

export default styled(Table)`
    display: flex;
    flex-direction: column;

    .paginator-container {
        margin-top: 12px;
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
`;
