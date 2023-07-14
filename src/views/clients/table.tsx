import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Client } from 'core/clients/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteClient from 'services/clients/delete-client';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [clientDni, setClientDni] = useState<string>('')

    const handleOpen = useCallback((clientDni: string) => {
        setOpen(true);
        setClientDni(clientDni);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setClientDni('');
    }, []);

    const onDelete = useCallback(async (clientDni: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteClient(clientDni!);
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
      }, [dispatch, fetchItems]);

    return (
        <div className={className}>
            <DynamicTable
                headers={[
                    { columnLabel: 'Cedula', fieldName: 'clientDni', cellAlignment: 'left' },
                    { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
                    { columnLabel: 'Correo electrónico', fieldName: 'email', cellAlignment: 'left' },
                    { columnLabel: 'Teléfono principal', fieldName: 'mainPhone', cellAlignment: 'left' },
                    { columnLabel: 'Teléfono secundario', fieldName: 'secondaryPhone', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: Client) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/clients/edit/'+row.clientDni) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Client) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.clientDni) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(clientDni) }} 
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
  items: Client[];
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
