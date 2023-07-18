import {
    Box,
    Button,
    Fade,
    Modal,
    Pagination,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons';
import DynamicTable, { Header } from 'components/DynamicTable';
// Own
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { StockPaginatedResponse } from 'services/stocks/get-paginate';
import styled from 'styled-components';
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import DialogDelete from 'components/dialogDelete';
import { Stock } from 'core/stocks/types';
import MainCard from 'components/cards/MainCard';
import Form, { StocksFormValues } from '../form/form';
import { FormikHelpers } from 'formik';
import deleteStock from 'services/stocks/delete-stock';
import editStock from 'services/stocks/edit-stock';
import createStock from 'services/stocks/create-stock';

const styleUpdateModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  boxShadow: 'none',
  p: 0,
};

const Table: FunctionComponent<Props> = (
    { isFixedRif, items, paginate, className, onChange, reload, openCreate, fixedAgencyRif, onCloseCreate }
) => {
    const dispatch = useAppDispatch();
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [stock, setStock] = useState<Stock | null>(null)

    const openDeleteModal = useCallback((stock: Stock) => {
        setOpenDelete(true);
        setStock(stock);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setOpenDelete(false);
        setStock(null); 
    }, [])

    const openEditModal = useCallback((stock: Stock) => {
        setOpenEdit(true);
        setStock(stock);
    }, []);

    const closeEditModal = useCallback(() => {
        setOpenEdit(false);
        setStock(null); 
    }, []);

    const onDelete = useCallback(async (stock: Stock) => {
        // Eliminar Coordinador
        try {
            dispatch(setIsLoading(true));
            await deleteStock(stock!);
            dispatch(setSuccessMessage(`Stock eliminado correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
            closeDeleteModal();
            reload();
        }
    }, [dispatch, reload, closeDeleteModal]);

    const onUpdate = useCallback(async (values: StocksFormValues, { setErrors, setStatus, setSubmitting }: FormikHelpers<StocksFormValues>) => {
        try {
            dispatch(setIsLoading(true));
            setErrors({});
            setStatus({});
            setSubmitting(true);
            await editStock({
                agencyRif: values.agencyRif!,
                productId: values.productId!,
                onStock: +values.onStock,
                minCapacity: +values.minCapacity,
                maxCapacity: +values.maxCapacity,
            });
            reload();
            dispatch(setSuccessMessage(
                `Stock del producto ${values.productId} para la agencia ${values.agencyRif} editado correctamente`
            ));
            closeEditModal();
        } catch (error) {
            if (error instanceof BackendError) {
                setErrors({
                    ...error.getFieldErrorsMessages(),
                    submit: error.getMessage()
                });
                dispatch(setErrorMessage(error.getMessage()));
            }
            setStatus({ success: false });
        } finally {
            dispatch(setIsLoading(false));
            setSubmitting(false);
        }
    }, [closeEditModal, dispatch, reload]);

    const onCreate = useCallback(async (values: StocksFormValues, { setErrors, setStatus, setSubmitting }: FormikHelpers<StocksFormValues>) => {
        console.log(values)
        try {
            dispatch(setIsLoading(true));
            setErrors({});
            setStatus({});
            setSubmitting(true);
            await createStock({
                agencyRif: values.agencyRif!,
                productId: values.productId!,
                onStock: +values.onStock,
                minCapacity: +values.minCapacity,
                maxCapacity: +values.maxCapacity,
            });
            reload();
            dispatch(setSuccessMessage(
                `Stock del producto ${values.productId} para la agencia ${values.agencyRif} creado correctamente`
            ));
            onCloseCreate();
        } catch (error) {
            if (error instanceof BackendError) {
                setErrors({
                    ...error.getFieldErrorsMessages(),
                    submit: error.getMessage()
                });
                dispatch(setErrorMessage(error.getMessage()));
            }
            setStatus({ success: false });
        } finally {
            dispatch(setIsLoading(false));
            setSubmitting(false);
        }
    }, [dispatch, onCloseCreate, reload]);

    const initialFormValue = useInitialFormValue(stock, fixedAgencyRif);

    const headerArray = useMemo(() => {
        const _headerArray: Header<any>[] = [
            { columnLabel: 'Codigo producto', fieldName: 'productId', cellAlignment: 'left' },
            { columnLabel: 'Nombre producto', fieldName: 'shortNameProduct', cellAlignment: 'left' },
            { columnLabel: 'Stock', fieldName: 'onStock', cellAlignment: 'left' },
            {
                columnLabel: 'Capacidad',
                fieldName: 'minCapacity',
                cellAlignment: 'left',
                onRender: (row: Stock) => (row.minCapacity + ' - ' + row.maxCapacity)
            },
        ]
        if (!isFixedRif)
            _headerArray.push({ columnLabel: 'Rif Agencia', fieldName: 'agencyRif', cellAlignment: 'left' })
        return _headerArray;
    }, [isFixedRif])

    return (
        <div className={className}>
            <DynamicTable
                headers={headerArray}
                emptyState={
                    <center className={'full-empty-state'}>
                        <p>No hay coordinadores</p>
                    </center>
                }
                rows={items} components={[
                    (row: Stock) =>
                        <Button
                            color="primary"
                            onClick={() => { openEditModal(row) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Stock) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => openDeleteModal(row) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={closeDeleteModal} 
                onDelete={() => { onDelete(stock!) } } 
                open={openDelete}
            />
            <Modal
                open={openEdit || openCreate}
                onClose={() => {
                    if (openEdit) closeEditModal()
                    if (openCreate) onCloseCreate()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={openEdit || openCreate}>
                    <Box sx={styleUpdateModal}>
                        <MainCard className={className}
                        title={openCreate ? 'Crear coordinador' : 'Editar coordinador'}
                        >
                        {(openEdit || openCreate) && initialFormValue &&
                            <Form
                                fixedAgencyRif={fixedAgencyRif}
                                onSubmit={
                                    (
                                        values: StocksFormValues,
                                        helpers: FormikHelpers<StocksFormValues>
                                    ) => {
                                        if (openEdit && stock !== null) {
                                            onUpdate(values, helpers);
                                        } else {
                                            onCreate(values, helpers);
                                        }
                                    }
                                }
                                initialValues={initialFormValue}
                                isUpdate={openEdit}
                            />
                        }
                        </MainCard>
                    </Box>
                </Fade>
            </Modal>
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

function useInitialFormValue(stock: Stock | null, fixedAgencyRif: string | null): StocksFormValues {
    return useMemo(() => {
        return {
            agencyRif: fixedAgencyRif || null,
            productId: stock?.productId || null,
            onStock: +(stock?.onStock || 0),
            minCapacity: +(stock?.minCapacity || 0),
            maxCapacity: +(stock?.maxCapacity || 0),
            submit: null,
        }
    }, [
        fixedAgencyRif,
        stock?.productId,
        stock?.onStock,
        stock?.minCapacity,
        stock?.maxCapacity
    ]);
}

type Props = StockPaginatedResponse & { 
    className?: string, 
    onChange: (page: number) => void,
    reload: () => void,
    openCreate: boolean,
    onCloseCreate: () => void,
    fixedAgencyRif: string | null;
    isFixedRif: boolean;
};

export default styled(Table)`
    display: flex;
    flex-direction: column;

    .paginator-container {
        margin-top: 12px;
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .full-empty-state {
        width: 100%;
    }
`;
