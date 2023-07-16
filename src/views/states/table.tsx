import {
    Button,
    Pagination,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons';
import DynamicTable from 'components/DynamicTable';
// Own
import { State } from 'core/states/types';
import { FunctionComponent, useCallback, useState } from 'react';
import { StatePaginatedResponse } from 'services/states/get-paginate';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import deleteState from 'services/states/delete-state';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Props> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [stateId, setStateId] = useState<number>(0)

    const handleOpen = useCallback((stateId: number) => {
        setOpen(true);
        setStateId(stateId);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setStateId(0); 
    }, [])

    const onDelete = useCallback(async (stateId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteState(stateId!);
            dispatch(setSuccessMessage(`Estado eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
            handleClose();
            fetchItems();
        }
      }, [dispatch, fetchItems, handleClose]);

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
                            onClick={ () => handleOpen(row.stateId) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(stateId) } } 
                open={open}
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

type Props = StatePaginatedResponse & { 
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
