import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import { BankCard } from 'core/bankCards/types';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteBankCard from 'services/bankCards/delete-bankCard';
import DialogDelete from 'components/dialogDelete';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [cardNumber, setCardNumber] = useState<string>('')

    const handleOpen = useCallback((cardNumber: string) => {
        setOpen(true);
        setCardNumber(cardNumber);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setCardNumber('');
    }, []);

    const onDelete = useCallback(async (cardNumber: string) => {
        try {
            dispatch(setIsLoading(true));
            await deleteBankCard(cardNumber!);
            dispatch(setSuccessMessage(`Tarjeta eliminada correctamente`));
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
                    { columnLabel: 'Numero de tarjeta', fieldName: 'cardNumber', cellAlignment: 'left' },
                    { columnLabel: 'Banco', fieldName: 'bank', cellAlignment: 'left' }
                ]}
                rows={items} components={[
                    (row: BankCard) =>
                    <Button
                        color="primary"
                        onClick={() => { navigate('/bankCards/edit/'+row.cardNumber) }}
                        startIcon={<IconEdit />}
                    >
                        Editar
                    </Button>,
                    (row: BankCard) =>
                    <Button 
                        color="secondary" 
                        onClick={ () => handleOpen(row.cardNumber) }
                        startIcon={<IconTrash />}
                    >
                        Eliminar
                    </Button>
                ]}
             />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(cardNumber)  } } 
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
  items: BankCard[];
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
