import {
    Button,
    Pagination,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons';
import DynamicTable from 'components/DynamicTable';
// Own
import { State } from 'core/states/types';
import { FunctionComponent, useCallback } from 'react';
import { StatePaginatedResponse } from 'services/states/get-paginate';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import deleteState from 'services/states/delete-state';

const Table: FunctionComponent<Props> = ({ items, paginate, className, onChange }) => {
    const navigate = useNavigate();

    const onDelete = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
        // try {
        //   await deleteState(values);
        //   navigate('/states/');
        //   dispatch(setSuccessMessage(`Estado borrado correctamente`));
        // } catch (error) {
        //   if (error instanceof BackendError) {
        //     setErrors({
        //       ...error.getFieldErrorsMessages(),
        //       submit: error.getMessage()
        //     });
        //   }
        //   setStatus({ success: false });
        // } finally {
        //   setSubmitting(false);
        // }
      }, []);

    return (
        <div className={className}>
            <DynamicTable
                headers={[
                { columnLabel: 'Id', fieldName: 'stateId', cellAlignment: 'left' },
                { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
                { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: State) =>
                    <Button
                        color="primary"
                        onClick={() => { navigate('/states/edit/'+row.stateId) }}
                        startIcon={<IconEdit />}
                    >
                        Editar
                    </Button>,
                    (row: State) =>
                    <Button 
                        color="secondary" 
                        onClick={ () => onDelete }
                        startIcon={<IconTrash />}
                    >
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

type Props = StatePaginatedResponse & { className?: string, onChange: (page: number) => void };

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
