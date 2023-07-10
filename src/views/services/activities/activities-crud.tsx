import { FunctionComponent, useState, useCallback } from 'react';
// material-ui
import styled from 'styled-components';
import { Box, Button, Fade, Modal } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import ActivitiesList from './activities-list';
import MainCard from 'components/cards/MainCard';
import Form, { ActivityFormValues } from './form';
import { Activity } from 'core/activities/types';

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

const ActivitiesCrud: FunctionComponent<Props> = ({ className, isUpdate, onDelete, items }) => {
  //const isCreated = !isUpdate;
  const [open, setOpen] = useState(false);
  const [isChildUpdate, setIsChildUpdate] = useState(false);
  const [initialValue, setInitialValue] = useState<ActivityFormValues | null>(null);

  const closeModal = useCallback(() => {
    setOpen(false);
    setInitialValue(null);
  }, []);

  const openCreateModal = useCallback(() => {
    setOpen(true);
    setInitialValue({ ...DEFAULT_INITIAL_VALUE });
  }, []);

  const openEditModal = useCallback((activity: Activity, index: number) => {
    setOpen(true);
    setInitialValue({
      description: activity.description,
      costHour: activity.costHour,
      submit: null,
    });
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
                  onSubmit={() => {}}
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
  items: Activity[];
  onDelete: (activity: Activity, index: number) => void;
  onUpdate: (activity: Activity, formValues: ActivityFormValues, index: number) => void;
  onCreate: (formValues: ActivityFormValues, index: number) => void;
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
