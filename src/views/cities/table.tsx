import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { City } from 'core/cities/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from '../../store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import deleteCity from 'services/cities/delete-city';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [currentCityId, setCurrentCityId] = useState<number>(0)

    const handleOpen = useCallback((currentCityId: number) => {
        setOpen(true);
        setCurrentCityId(currentCityId);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setCurrentCityId(0);
    }, []);

    const onDelete = useCallback(async (jobId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteCity(jobId!);
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
                    { columnLabel: 'Id', fieldName: 'cityId', cellAlignment: 'left' },
                    { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
                    { columnLabel: 'Estado', fieldName: 'stateId', cellAlignment: 'left' },
                    { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: City) =>
                    <Button
                        color="primary"
                        onClick={() => { navigate('/cities/edit/'+row.cityId) }}
                        startIcon={<IconEdit />}
                    >
                        Editar
                    </Button>,
                    (row: City) =>
                    <Button 
                        color="secondary" 
                        onClick={ () => handleOpen(row.cityId) }
                        startIcon={<IconTrash />}
                    >
                        Eliminar
                    </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(currentCityId)  } } 
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
  items: City[];
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
