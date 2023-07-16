import {
    Box,
    Button,
    Fade,
    Modal,
    Pagination,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons';
import DynamicTable from 'components/DynamicTable';
// Own
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { CoordinatorPaginatedResponse } from 'services/coordinators/get-paginate';
import styled from 'styled-components';
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import DialogDelete from 'components/dialogDelete';
import { Coordinator } from 'core/coordinators/types';
import deleteCoordinator from 'services/coordinators/delete-coordinator';
import MainCard from 'components/cards/MainCard';
import Form, { CoordinatorsFormValues } from '../form/form';
import { FormikHelpers } from 'formik';
import editCoordinator from 'services/coordinators/edit-coordinator';
import createCoordinator from 'services/coordinators/create-coordinator';

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
    { items, paginate, className, onChange, reload, openCreate, fixedAgencyRif, onCloseCreate }
) => {
    const dispatch = useAppDispatch();
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [coordinator, setCoordinator] = useState<Coordinator | null>(null)

    const openDeleteModal = useCallback((coordinator: Coordinator) => {
        setOpenDelete(true);
        setCoordinator(coordinator);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setOpenDelete(false);
        setCoordinator(null); 
    }, [])

    const openEditModal = useCallback((coordinator: Coordinator) => {
        setOpenEdit(true);
        setCoordinator(coordinator);
    }, []);

    const closeEditModal = useCallback(() => {
        setOpenEdit(false);
        setCoordinator(null); 
    }, []);

    const onDelete = useCallback(async (coordinator: Coordinator) => {
        // Eliminar Coordinador
        try {
            dispatch(setIsLoading(true));
            await deleteCoordinator(coordinator!);
            dispatch(setSuccessMessage(`Coordinador eliminado correctamente`));
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

    const onUpdate = useCallback(async (values: CoordinatorsFormValues, { setErrors, setStatus, setSubmitting }: FormikHelpers<CoordinatorsFormValues>) => {
        try {
            dispatch(setIsLoading(true));
            setErrors({});
            setStatus({});
            setSubmitting(true);
            await editCoordinator({
                employeeDni: values.employeeDni!,
                serviceId: +values.serviceId!,
                reservationTime: +values.reservationTime,
                capacity: +values.capacity,
            });
            reload();
            dispatch(setSuccessMessage(
                `Coordinador ${values.employeeDni} para el servicio ${values.serviceId} editado correctamente`
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

    const onCreate = useCallback(async (values: CoordinatorsFormValues, { setErrors, setStatus, setSubmitting }: FormikHelpers<CoordinatorsFormValues>) => {
        console.log(values)
        try {
            dispatch(setIsLoading(true));
            setErrors({});
            setStatus({});
            setSubmitting(true);
            await createCoordinator({
                employeeDni: values.employeeDni!,
                serviceId: +values.serviceId!,
                reservationTime: +values.reservationTime,
                capacity: +values.capacity,
            });
            reload();
            dispatch(setSuccessMessage(
                `Coordinador ${values.employeeDni} para el servicio ${values.serviceId} creado correctamente`
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

    const initialFormValue = useInitialFormValue(coordinator, fixedAgencyRif);

    return (
        <div className={className}>
            <DynamicTable
                headers={[
                    /*{ columnLabel: 'Rif Agencia', fieldName: 'agencyRif', cellAlignment: 'left' },*/
                    { columnLabel: 'Dni coordinador', fieldName: 'employeeDni', cellAlignment: 'left' },
                    { columnLabel: 'Nombre coordinador', fieldName: 'employeeName', cellAlignment: 'left' },
                    { columnLabel: 'Nombre servicio', fieldName: 'serviceName', cellAlignment: 'left' },
                    { columnLabel: 'Tiempo de reserva', fieldName: 'reservationTime', cellAlignment: 'left' },
                    { columnLabel: 'Capacidad', fieldName: 'capacity', cellAlignment: 'left' }
                ]}
                emptyState={
                    <center className={'full-empty-state'}>
                        <p>No hay coordinadores</p>
                    </center>
                }
                rows={items} components={[
                    (row: Coordinator) =>
                        <Button
                            color="primary"
                            onClick={() => { openEditModal(row) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Coordinator) =>
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
                onDelete={() => { onDelete(coordinator!) } } 
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
                                        values: CoordinatorsFormValues,
                                        helpers: FormikHelpers<CoordinatorsFormValues>
                                    ) => {
                                        if (openEdit && coordinator !== null) {
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

function useInitialFormValue(coordinator: Coordinator | null, fixedAgencyRif: string | null): CoordinatorsFormValues {
    return useMemo(() => {
        return {
            agencyRif: fixedAgencyRif || null,
            employeeDni: coordinator?.employeeDni || null,
            serviceId: coordinator?.serviceId || null,
            capacity: coordinator?.capacity || 0,
            reservationTime: coordinator?.reservationTime || 0,
            submit: null,
        }
    }, [
        fixedAgencyRif,
        coordinator?.employeeDni,
        coordinator?.serviceId,
        coordinator?.capacity,
        coordinator?.reservationTime
    ]);
}

type Props = CoordinatorPaginatedResponse & { 
    className?: string, 
    onChange: (page: number) => void,
    reload: () => void,
    openCreate: boolean,
    onCloseCreate: () => void,
    fixedAgencyRif: string | null;
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
