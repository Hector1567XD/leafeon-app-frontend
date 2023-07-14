import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Manager } from 'core/managers/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from '../../store/index';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteManager from 'services/managers/delete-manager';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [managerDni, setManagerDni] = useState<string>('')

    const handleOpen = useCallback((managerDni: string) => {
        setOpen(true);
        setManagerDni(managerDni);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setManagerDni('');
    }, []);

    const onDelete = useCallback(async (managerDni: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteManager(managerDni!);
            dispatch(setSuccessMessage(`Encargado eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
            handleClose();
            fetchItems();
        }
      }, [dispatch, fetchItems]);

    return (
        <div className={className}>
            <DynamicTable
                headers={[
                { columnLabel: 'Id', fieldName: 'managerDni', cellAlignment: 'left' },
                { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
                { columnLabel: 'Teléfono', fieldName: 'mainPhone', cellAlignment: 'left' },
                { columnLabel: 'Teléfono secundario', fieldName: 'secondaryPhone', cellAlignment: 'left' },
                { columnLabel: 'Dirección', fieldName: 'address', cellAlignment: 'left' },
                { columnLabel: 'Email', fieldName: 'email', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: Manager) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/managers/edit/'+row.managerDni) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                        (row: Manager) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.managerDni) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(managerDni) } } 
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
  items: Manager[];
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
