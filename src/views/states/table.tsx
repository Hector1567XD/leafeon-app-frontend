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
import { useAppDispatch } from '../../store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import deleteState from 'services/states/delete-state';
import DialogDelete from './dialogDelete';

const Table: FunctionComponent<Props> = ({ items, paginate, className, onChange }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [currentStateId, setCurrentStateId] = useState<number>(0)

    const handleOpen = (currentStateId: number) => {
        setOpen(true);
        setCurrentStateId(currentStateId); 
    }

    const handleClose = () => {
        setOpen(false);
        setCurrentStateId(0); 
    }

    const onDelete = useCallback(async (currentStateId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteState(currentStateId!);
            navigate('/states');
            dispatch(setSuccessMessage(`Estado eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
            handleClose();
        }
      }, [dispatch, navigate]);

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
            <DialogDelete handleClose={handleClose} id={currentStateId} onDelete={onDelete} open={open}/>
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
