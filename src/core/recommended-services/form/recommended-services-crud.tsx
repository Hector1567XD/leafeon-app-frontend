import { FunctionComponent, useState, useCallback } from 'react';
// material-ui
import styled from 'styled-components';
import { Box, Button, Fade, Modal } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import RecommendedServicesList from './recommended-services-list';
import MainCard from 'components/cards/MainCard';
import Form, { RecommendedServiceFormValues } from './form';
import { FormikHelpers } from 'formik';
import { LocalRecommendedService } from './types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  boxShadow: 'none',
  p: 0,
};

const DEFAULT_INITIAL_VALUE: RecommendedServiceFormValues = {
  serviceId: 0,
  mileage: 0,
  useTime: 0,
  submit: null,
};

const RecommendedServicesCrud: FunctionComponent<Props> = ({
  className, items, onDelete, onUpdate, onCreate, modelId, isParentUpdate
}) => {
  //const isCreated = !isUpdate;
  const [open, setOpen] = useState(false);
  const [initialValue, setInitialValue] = useState<RecommendedServiceFormValues | null>(null);
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

  const openEditModal = useCallback((service: LocalRecommendedService, index: number) => {
    setOpen(true);
    setInitialValue({
      serviceId: +service.serviceId,
      mileage: +service.mileage,
      useTime: +service.useTime,
      submit: null,
    });
    setSelectedIndex(index);
  }, []);

  return (
    <>
      <MainCard className={className} headerClass={'page-header-container'}
        title={
          <div className={'page-header'}>
            <span>Servicios recomendados</span>
            <Button
              color="primary"
              size="small"
              variant={'outlined'}
              onClick={openCreateModal}
              startIcon={<IconCirclePlus />}
            >
              Crear
            </Button>
          </div>
        }
      >
        <RecommendedServicesList
          modelId={modelId}
          items={items}
          onEdit={openEditModal}
          onDelete={onDelete}
        />
      </MainCard>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <MainCard className={className}
              title={isUpdate ? 'Crear servicio recomendado' : 'Editar servicio recomendado'}
            >
              {open && initialValue &&
                <Form
                  isParentUpdate={isParentUpdate}
                  onSubmit={
                    (
                      values: RecommendedServiceFormValues, helpers: FormikHelpers<RecommendedServiceFormValues>
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
    </>
  );
};

interface Props {
  isParentUpdate?: boolean;
  className?: string;
  isUpdate?: boolean;
  items: LocalRecommendedService[];
  modelId?: string | null;
  onDelete: (activity: LocalRecommendedService, index: number) => void;
  onUpdate: (activity: LocalRecommendedService, formValues: RecommendedServiceFormValues, index: number) => void;
  onCreate: (formValues: RecommendedServiceFormValues) => void;
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
