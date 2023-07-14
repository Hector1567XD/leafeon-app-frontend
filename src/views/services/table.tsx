import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import styled from 'styled-components';
// Own
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { PaginatedService } from 'core/services/types';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import DialogDelete from 'components/dialogDelete';
import deleteService from 'services/services/delete-service';

const Table: FunctionComponent<Prop> = ({ items, paginate, fetchItems, className, onChange }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [currentServiceId, setCurrentServiceId] = useState<number | null>(null)

    const handleOpen = useCallback((currentServiceId: number) => {
        setOpen(true);
        setCurrentServiceId(currentServiceId);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setCurrentServiceId(null); 
    }, [])

    const onDelete = useCallback(async (serviceId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteService(serviceId!);
            dispatch(setSuccessMessage(`Servicio eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError)
                dispatch(setErrorMessage(error.getMessage()));
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
                    { columnLabel: 'Id', fieldName: 'serviceId', cellAlignment: 'left' },
                    { columnLabel: 'Descripción', fieldName: 'description', cellAlignment: 'left' },
                    { columnLabel: 'Coste total', fieldName: 'totalCost', cellAlignment: 'left' },
                    { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items}
                components={[
                    (row: PaginatedService) =>
                    <Button
                        color="primary"
                        onClick={() => { navigate('/services/edit/'+row.serviceId) }}
                        startIcon={<IconEdit />}
                    >
                        Editar
                    </Button>,
                    (row: PaginatedService) =>
                    <Button
                        color="secondary"
                        startIcon={<IconTrash />}
                        onClick={ () => handleOpen(row.serviceId) }
                    >
                        Eliminar
                    </Button>
                ]}
            />
            <DialogDelete
                handleClose={handleClose}
                onDelete={() => { currentServiceId && onDelete(currentServiceId) }}
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
  items: PaginatedService[];
  paginate: PaginateData;
  className?: string;
  fetchItems: () => void;
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
