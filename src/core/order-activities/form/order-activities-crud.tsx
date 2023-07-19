import { FunctionComponent, useState, useCallback } from 'react';
// material-ui
import styled from 'styled-components';
import { Box, Button, Fade, Modal } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import OrderActivitiesList from './order-activities-list';
import MainCard from 'components/cards/MainCard';
import Form, { OrderActivityFormValues } from './form';
import { FormikHelpers } from 'formik';
import { LocalOrderActivity } from './types';
import { Booking } from 'core/bookings/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  boxShadow: 'none',
  p: 0,
};

const DEFAULT_INITIAL_VALUE: OrderActivityFormValues = {
  serviceId: null,
  activityId: null,
  employeeDni: null,
  hoursTaken: 0,
  submit: null,
};

const RecommendedServicesCrud: FunctionComponent<Props> = ({
  className, items, onDelete, onUpdate, onCreate, orderId, booking, isParentUpdate
}) => {
  //const isCreated = !isUpdate;
  const [open, setOpen] = useState(false);
  const [initialValue, setInitialValue] = useState<OrderActivityFormValues | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isUpdate = selectedIndex !== null;

  const closeModal = useCallback(() => {
    setOpen(false);
    setInitialValue(null);
    setSelectedIndex(null);
  }, []);

  const openCreateModal = useCallback(() => {
    setOpen(true);
    setInitialValue({ ...DEFAULT_INITIAL_VALUE });
    setSelectedIndex(null);
  }, []);

  const openEditModal = useCallback((orderActivity: LocalOrderActivity, index: number) => {
    setOpen(true);
    setInitialValue({
      serviceId: +orderActivity.serviceId,
      activityId: +orderActivity.activityId,
      employeeDni: orderActivity.employeeDni,
      hoursTaken: +orderActivity.hoursTaken,
      submit: null,
    });
    setSelectedIndex(index);
  }, []);
  return (
    <>
      <MainCard className={className} headerClass={'page-header-container'}
        title={
          <div className={'page-header'}>
            <span>Actividades de orden</span>
            <Button
              color="primary"
              size="small"
              disabled={!booking}
              variant={'outlined'}
              onClick={openCreateModal}
              startIcon={<IconCirclePlus />}
            >
              Crear
            </Button>
          </div>
        }
      >
        <OrderActivitiesList
          isParentUpdate={isParentUpdate}
          orderId={orderId}
          items={items}
          onEdit={openEditModal}
          onDelete={onDelete}
        />
      </MainCard>
      {
        (booking) &&
        (
          <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Fade in={open}>
              <Box sx={style}>
                <MainCard className={className}
                  title={isUpdate ? 'Editar actividad en orden' : 'Crear actividad en orden'}
                >
                  {open && initialValue &&
                    <Form
                      agencyRif={booking.agencyRif}
                      isParentUpdate={isParentUpdate}
                      onSubmit={
                        (
                          values: OrderActivityFormValues, helpers: FormikHelpers<OrderActivityFormValues>
                        ) => {
                          if (isUpdate && selectedIndex !== null) {
                            onUpdate(items[selectedIndex], values, selectedIndex);
                          } else {
                            onCreate(values);
                          }
                          closeModal();
                        }
                      }
                      initialValues={initialValue}
                      isUpdate={isUpdate}
                    />
                  }
                </MainCard>
              </Box>
            </Fade>
          </Modal>
        )
      }
    </>
  );
};

interface Props {
  isParentUpdate?: boolean;
  className?: string;
  isUpdate?: boolean;
  items: LocalOrderActivity[];
  orderId?: number | null;
  booking: Booking | null;
  onDelete: (item: LocalOrderActivity, index: number) => void;
  onUpdate: (item: LocalOrderActivity, formValues: OrderActivityFormValues, index: number) => void;
  onCreate: (formValues: OrderActivityFormValues) => void;
}

export default styled(RecommendedServicesCrud)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-header-container {
    padding-bottom: 18.5px;
  }

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
