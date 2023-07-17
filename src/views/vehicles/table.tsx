import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Vehicle } from 'core/vehicles/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteVehicle from 'services/vehicles/delete-vehicle';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [licensePlate, setVehicleDni] = useState<string>('')

    const handleOpen = (licensePlate: string) => {
        setOpen(true);
        setVehicleDni(licensePlate); 
    }

    const handleClose = () => {
        setOpen(false);
        setVehicleDni(''); 
    }

    const onDelete = useCallback(async (licensePlate: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteVehicle(licensePlate!);
            navigate('/vehicles');
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
                    { columnLabel: 'Matrícula', fieldName: 'licensePlate', cellAlignment: 'left' },
                    { columnLabel: 'Cliente', fieldName: 'clientDni', cellAlignment: 'left' },
                    { columnLabel: 'Nro serial', fieldName: 'nroSerial', cellAlignment: 'left' },
                    { columnLabel: 'Nro motor', fieldName: 'nroMotor', cellAlignment: 'left' },
                    { columnLabel: 'Modelo', fieldName: 'modelId', cellAlignment: 'left' },
                    { columnLabel: 'color', fieldName: 'color', cellAlignment: 'left' },
                    { columnLabel: 'Descripción', fieldName: 'extraDescriptions', cellAlignment: 'left' },
                    { columnLabel: 'Resumen Mantenimiento', fieldName: 'maintenanceSummary', cellAlignment: 'left' },
                    { columnLabel: 'Agencia vendedora', fieldName: 'agencySeller', cellAlignment: 'left' },
                    { columnLabel: 'Fecha venta', fieldName: 'saleDate', cellAlignment: 'left' },
                ]}
                rows={items} components={[
                    (row: Vehicle) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/vehicles/edit/'+row.licensePlate) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Vehicle) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.licensePlate) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(licensePlate) }} 
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
  items: Vehicle[];
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
