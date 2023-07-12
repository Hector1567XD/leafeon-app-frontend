import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Job } from 'core/jobs/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from '../../store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteJob from 'services/jobs/delete-job';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [jobId, setJobId] = useState<number>(0)

    const handleOpen = (jobId: number) => {
        console.log("abriendo")
        setOpen(true);
        setJobId(jobId); 
    }

    const handleClose = () => {
        setOpen(false);
        setJobId(0); 
    }

    const onDelete = useCallback(async (jobId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteJob(jobId!);
            navigate('/jobs');
            dispatch(setSuccessMessage(`Cargo eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
        }
      }, [dispatch, navigate]);

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
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-delete-title"
            aria-describedby="alert-delete-description"

        >
            <DialogTitle id="alert-delete-title">{"Confirmación"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-delete-description">
                    ¿Está seguro de querer borrar este elemento?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                <Button onClick={() => onDelete(jobId)} color="primary">Aceptar</Button>
            </DialogActions>

        </Dialog>
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
