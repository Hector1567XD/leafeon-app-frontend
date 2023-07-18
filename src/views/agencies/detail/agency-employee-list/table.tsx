import { Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
// Own
import { FunctionComponent } from 'react';
import { EmployeesPaginated } from 'services/employees/get-paginate';
import styled from 'styled-components';

const Table: FunctionComponent<Props> = ({ items, paginate, className, onChange, fetchItems }) => {
    return (
        <div className={className}>
            <DynamicTable
                headers={[
                    { columnLabel: 'Dni', fieldName: 'employeeDni', cellAlignment: 'left' },
                    { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
                    { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items}
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

type Props = EmployeesPaginated & { 
    className?: string, 
    onChange: (page: number) => void,
    fetchItems: () => void
};

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
