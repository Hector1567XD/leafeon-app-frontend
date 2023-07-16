import { FunctionComponent, useState, useCallback } from 'react';
// material-ui
import styled from 'styled-components';
import { Box, Button, Fade, Modal } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import ActivitiesList from './activities-list';
import MainCard from 'components/cards/MainCard';
import Form, { ActivityFormValues } from './form';
import { FormikHelpers } from 'formik';
import { ActivityLocal } from '../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  boxShadow: 'none',
  p: 0,
};

const DEFAULT_INITIAL_VALUE: ActivityFormValues = {
  description: '',
  costHour: 0,
  submit: null,
};

const ActivitiesCrud: FunctionComponent<Props> = ({ className, isUpdate, items, onDelete, onUpdate, onCreate, onRevertDelete }) => {
  //const isCreated = !isUpdate;
  const [open, setOpen] = useState(false);
  const [initialValue, setInitialValue] = useState<ActivityFormValues | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isChildUpdate = selectedIndex !== null;

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

  const openEditModal = useCallback((activity: ActivityLocal, index: number) => {
    console.log('-----', activity, index);
    setOpen(true);
    setInitialValue({
      description: activity.description,
      costHour: activity.costHour,
      submit: null,
    });
    setSelectedIndex(index);
  }, []);

  return (
    <>
      <MainCard className={className} headerClass={'page-header-container'}
        title={
          <div className={'page-header'}>
            <span>
                Actividades
            </span>
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
        <ActivitiesList
          items={items}
          onRevertDelete={onRevertDelete}
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
              title={isChildUpdate ? 'Crear actividad' : 'Editar actividad'}
            >
              {open && initialValue &&
                <Form
                onSubmit={
                    (
                      values: ActivityFormValues, helpers: FormikHelpers<ActivityFormValues>
                    ) => {
                      if (isChildUpdate && selectedIndex !== null) {
                        onUpdate(items[selectedIndex], values, selectedIndex);
                      } else {
                        onCreate(values);
                      }
                      closeModal();
                    }
                  }
                  initialValues={initialValue}
                  isUpdate={isChildUpdate}
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
  className?: string;
  isUpdate?: boolean;
  items: ActivityLocal[];
  onDelete: (activity: ActivityLocal, index: number) => void;
  onRevertDelete: (activity: ActivityLocal, index: number) => void;
  onUpdate: (activity: ActivityLocal, formValues: ActivityFormValues, index: number) => void;
  onCreate: (formValues: ActivityFormValues) => void;
}

export default styled(ActivitiesCrud)`
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
