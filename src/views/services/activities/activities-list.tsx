import { FunctionComponent } from 'react';
// material-ui
import styled from 'styled-components';
import DynamicTable from 'components/DynamicTable';
import { IconButton } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';
import { Activity } from 'core/activities/types';

const ActivitiesList: FunctionComponent<Props> = ({ className, isUpdate, items, onEdit, onDelete }) => {
  //const isCreated = !isUpdate;
  return (
    <>
      <DynamicTable
        headers={[
          { columnLabel: 'Id', fieldName: 'activityId', cellAlignment: 'left' },
          { columnLabel: 'Descripción', fieldName: 'description', cellAlignment: 'left' },
          { columnLabel: 'Coste', fieldName: 'costHour', cellAlignment: 'left' }
        ]}
        rows={items}
        components={[
          (row: Activity, index: number) =>
            <IconButton
              color="primary"
              onClick={() => { onEdit(row, index) }}
            >
              <IconEdit />
            </IconButton>,
          (row: Activity, index: number) =>
            <IconButton
              color="secondary"
              onClick={() => { onDelete(row, index) }}
            >
              <IconTrash />
            </IconButton>,
      ]}
      />
    </>
  );
};

interface Props {
  className?: string;
  isUpdate?: boolean;
  items: Activity[];
  onEdit: (activity: Activity, index: number) => void;
  onDelete: (activity: Activity, index: number) => void;
}

export default styled(ActivitiesList)``;
