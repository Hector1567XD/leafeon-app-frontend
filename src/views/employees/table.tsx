import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Employee } from 'core/employees/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteEmployee from 'services/employees/delete-employee';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [employeeDni, setEmployeeDni] = useState<string>('')

    const handleOpen = (employeeDni: string) => {
        setOpen(true);
        setEmployeeDni(employeeDni); 
    }

    const handleClose = () => {
        setOpen(false);
        setEmployeeDni(''); 
    }

    const onDelete = useCallback(async (employeeDni: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteEmployee(employeeDni!);
            navigate('/employees');
            dispatch(setSuccessMessage(`Empleado eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
            handleClose();
            fetchItems();
        }
      }, [dispatch, fetchItems, navigate]);

    return (
        <div className={className}>
            <DynamicTable
                headers={[
                    { columnLabel: 'Cedula', fieldName: 'employeeDni', cellAlignment: 'left' },
                    { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
                    { columnLabel: 'Teléfono', fieldName: 'phone', cellAlignment: 'left' },
                    { columnLabel: 'Dirección', fieldName: 'address', cellAlignment: 'left' },
                    { columnLabel: 'Salario', fieldName: 'salary', cellAlignment: 'left' },
                    { columnLabel: 'Agencia', fieldName: 'agencyRif', cellAlignment: 'left' },
                    { columnLabel: 'Cargo', fieldName: 'jobId', cellAlignment: 'left' },
                ]}
                rows={items} components={[
                    (row: Employee) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/employees/edit/'+row.employeeDni) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Employee) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.employeeDni) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(employeeDni) }} 
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
  items: Employee[];
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
