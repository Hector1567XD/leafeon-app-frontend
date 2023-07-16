import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import styled from 'styled-components';
// Own
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { PaginatedModel } from 'core/models/types';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import DialogDelete from 'components/dialogDelete';
import deleteModel from 'services/models/delete-model';

const Table: FunctionComponent<Prop> = ({ items, paginate, fetchItems, className, onChange }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [currentModelId, setCurrentModelId] = useState<string | null>(null)

    const handleOpen = useCallback((_currentModelId: string) => {
        setOpen(true);
        setCurrentModelId(_currentModelId);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setCurrentModelId(null); 
    }, [])

    const onDelete = useCallback(async (modelId: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteModel(modelId!);
            dispatch(setSuccessMessage(`Modelo eliminado correctamente`));
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
                    { columnLabel: 'Modelo Id', fieldName: 'modelId', cellAlignment: 'left' },
                    { columnLabel: 'Descripción', fieldName: 'description', cellAlignment: 'left' },
                    //{ columnLabel: 'Cantidad de acientos', fieldName: 'seatsQuantity', cellAlignment: 'left' },
                    { columnLabel: 'Peso', fieldName: 'modelKg', cellAlignment: 'left' },
                    { columnLabel: 'Año', fieldName: 'modelYear', cellAlignment: 'left' },
                    { columnLabel: 'Refrigeracion', fieldName: 'refrigerantType', cellAlignment: 'left' },
                    { columnLabel: 'Octanaje', fieldName: 'octane', cellAlignment: 'left' },
                    { columnLabel: 'Caja', fieldName: 'oilBox', cellAlignment: 'left' },
                    //{ columnLabel: 'Tipo de aceite', fieldName: 'engineOilType', cellAlignment: 'left' },
                    //{ columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items}
                components={[
                    (row: PaginatedModel) =>
                    <Button
                        color="primary"
                        onClick={() => { navigate('/models/edit/'+row.modelId) }}
                        startIcon={<IconEdit />}
                    >
                        Editar
                    </Button>,
                    (row: PaginatedModel) =>
                    <Button
                        color="secondary"
                        startIcon={<IconTrash />}
                        onClick={ () => handleOpen(row.modelId) }
                    >
                        Eliminar
                    </Button>
                ]}
            />
            <DialogDelete
                handleClose={handleClose}
                onDelete={() => { currentModelId && onDelete(currentModelId) }}
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
  items: PaginatedModel[];
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
