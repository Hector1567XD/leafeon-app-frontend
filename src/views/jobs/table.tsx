import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Job } from 'core/jobs/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteJob from 'services/jobs/delete-job';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [jobId, setJobId] = useState<number>(0)

    const handleOpen = useCallback((jobId: number) => {
        setOpen(true);
        setJobId(jobId);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setJobId(0);
    }, []);

    const onDelete = useCallback(async (jobId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteJob(jobId!);
            dispatch(setSuccessMessage(`Cargo eliminado correctamente`));
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
                    { columnLabel: 'Id', fieldName: 'jobId', cellAlignment: 'left' },
                    { columnLabel: 'Nombre', fieldName: 'description', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: Job) =>
                    <Button
                        color="primary"
                        onClick={() => { navigate('/jobs/edit/'+row.jobId) }}
                        startIcon={<IconEdit />}
                    >
                        Editar
                    </Button>,
                    (row: Job) =>
                    <Button 
                        color="secondary" 
                        onClick={ () => handleOpen(row.jobId) }
                        startIcon={<IconTrash />}
                    >
                        Eliminar
                    </Button>
                ]}
             />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(jobId)  } } 
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

interface Prop {
  items: Job[];
  paginate: PaginateData;
  className?: string;
  onChange: (page: number) => void;
  fetchItems: () => void;
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
