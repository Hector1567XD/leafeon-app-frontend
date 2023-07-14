import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Agency } from 'core/agencies/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useState, useCallback } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteAgency from 'services/agencies/delete-agency';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [currentAgencyRif, setCurrentAgencyRif] = useState<string>('')

    const handleOpen = (currentAgencyRif: string) => {
        setOpen(true);
        setCurrentAgencyRif(currentAgencyRif); 
    }

    const handleClose = useCallback(() => {
        setOpen(false);
        setCurrentAgencyRif('');
    }, []);

    const onDelete = useCallback(async (currentAgencyRif: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteAgency(currentAgencyRif!);
            dispatch(setSuccessMessage(`Agencia eliminada correctamente`));
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
                    { columnLabel: 'RIF', fieldName: 'agencyRif', cellAlignment: 'left' },
                    { columnLabel: 'Nombre', fieldName: 'businessName', cellAlignment: 'left' },
                    { columnLabel: 'Manager DNI', fieldName: 'managerDni', cellAlignment: 'left' },
                    { columnLabel: 'Ciudad', fieldName: 'cityId', cellAlignment: 'left' },
                    { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: Agency) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/agencies/edit/'+row.agencyRif) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Agency) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.agencyRif) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(currentAgencyRif)  } } 
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
  items: Agency[];
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
