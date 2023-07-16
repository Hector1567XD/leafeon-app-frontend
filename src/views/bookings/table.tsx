import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Booking } from 'core/bookings/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteBooking from 'services/bookings/delete-booking';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [bookingId, setBookingId] = useState<number>(0)

    const handleOpen = (bookingId: number) => {
        setOpen(true);
        setBookingId(bookingId); 
    }

    const handleClose = () => {
        setOpen(false);
        setBookingId(0); 
    }

    const onDelete = useCallback(async (bookingId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteBooking(bookingId!);
            navigate('/bookings');
            dispatch(setSuccessMessage(`Reserva eliminada correctamente`));
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
                    { columnLabel: 'Id', fieldName: 'bookingId', cellAlignment: 'left' },
                    { columnLabel: 'Creación', fieldName: 'expeditionDate', cellAlignment: 'left' },
                    { columnLabel: 'Expiración', fieldName: 'expirationDate', cellAlignment: 'left' },
                    { columnLabel: 'Cliente', fieldName: 'clientDni', cellAlignment: 'left' },
                    { columnLabel: 'Matrícula', fieldName: 'licensePlate', cellAlignment: 'left' },
                ]}
                rows={items} components={[
                    (row: Booking) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/bookings/edit/'+row.bookingId) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Booking) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.bookingId) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(bookingId) }} 
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
  items: Booking[];
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
