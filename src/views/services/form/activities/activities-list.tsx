import { FunctionComponent } from 'react';
// material-ui
import styled from 'styled-components';
import DynamicTable from 'components/DynamicTable';
import { IconButton } from '@mui/material';
import { IconEdit, IconTrash, IconRotateClockwise } from '@tabler/icons';
import { ActivityLocal } from '../types';

function deepCompareLocalOnline(localActivity: ActivityLocal): boolean {
  const onlineActivity = localActivity.onlineState;
  if (!onlineActivity) {
    return true;
  }

  return (
    localActivity.description === onlineActivity.description &&
    '' + localActivity.costHour === '' + onlineActivity.costHour
  );
}

function getSyncStatus(localActivity: ActivityLocal): string {
  if (localActivity.activityId) {
    if (localActivity.localDeleted) {
      return '⏳';
    }

    if (!deepCompareLocalOnline(localActivity)) {
      return '⏳';
    }
    return '✅';
  }

  return '';
}

const ActivitiesList: FunctionComponent<Props> = ({ className, isUpdate, items, onEdit, onDelete, onRevertDelete }) => {
  //const isCreated = !isUpdate;
  return (
    <>
      <DynamicTable
        className={className}
        emptyState={
          <center className={'full-empty-state'}>
            <p>No hay actividades</p>
          </center>
        }
        headers={[
          {
            columnLabel: 'Sync',
            cellAlignment: 'left',
            onRender: (row: ActivityLocal) => {
              return <center>{getSyncStatus(row)}</center>
            },
          },
          { columnLabel: 'Descripción', fieldName: 'description', cellAlignment: 'left' },
          { columnLabel: 'Coste', fieldName: 'costHour', cellAlignment: 'left' }
        ]}
        renderColumnClass={
          (row: ActivityLocal) => {
            if (row.localDeleted) return 'disabled';
            return ''
          }
        }
        rows={items}
        components={[
          (row: ActivityLocal, index: number) =>
            (!row.localDeleted) && (<IconButton
              key={`activity-${index}-update`}
              color="primary"
              onClick={() => { onEdit(row, index) }}
            >
              <IconEdit />
            </IconButton>),
          (row: ActivityLocal, index: number) =>
            (!row.localDeleted) ? (<IconButton
              key={`activity-${index}-delete`}
              color="secondary"
              onClick={() => { onDelete(row, index) }}
            >
              <IconTrash />
            </IconButton>) : 
            (<IconButton
              key={`activity-${index}-revert`}
              color="secondary"
              onClick={() => { onRevertDelete(row, index) }}
            >
              <IconRotateClockwise />
            </IconButton>)
          ,
      ]}
      />
    </>
  );
};

interface Props {
  className?: string;
  isUpdate?: boolean;
  items: ActivityLocal[];
  onEdit: (activity: ActivityLocal, index: number) => void;
  onDelete: (activity: ActivityLocal, index: number) => void;
  onRevertDelete: (activity: ActivityLocal, index: number) => void; 
}

export default styled(ActivitiesList)`
  tr.disabled {
    opacity: 0.7;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #e9e9e9;
    cursor: not-allowed;
  }
  
  .full-empty-state {
    width: 100%;
  }
`;
