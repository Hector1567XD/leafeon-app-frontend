import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { Payment } from 'core/payments/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useState, useCallback } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deletePayment from 'services/payments/delete-payment';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [paymentId, setPaymentId] = useState<number>(0)
    const [billId, setBillId] = useState<number>(0)

    const handleOpen = useCallback((billId: number, paymentId: number) => {
        setOpen(true);
        setPaymentId(paymentId);
        setBillId(billId);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setPaymentId(0);
        setBillId(0);
    }, []);

    const onDelete = useCallback(async (billId: number, paymentId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deletePayment(billId!, paymentId!);
            dispatch(setSuccessMessage(`Pago eliminado correctamente`));
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
                    { columnLabel: 'Id factura', fieldName: 'billId', cellAlignment: 'left' },
                    { columnLabel: 'Id Pago', fieldName: 'paymentId', cellAlignment: 'left' },
                    { columnLabel: 'Monto', fieldName: 'amount', cellAlignment: 'left' },
                    { columnLabel: 'Fecha pago', fieldName: 'paymentDate', cellAlignment: 'left' },
                    { columnLabel: 'Metodo', fieldName: 'paymentMethod', cellAlignment: 'left' },
                    { columnLabel: 'Tarjeta', fieldName: 'cardNumber', cellAlignment: 'left' },
                    { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: Payment) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/payments/edit/billId/'+row.billId+'/payment/'+row.paymentId) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Payment) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.billId, row.paymentId) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(billId, paymentId)  } } 
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
  items: Payment[];
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
