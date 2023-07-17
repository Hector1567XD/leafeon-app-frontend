import { FunctionComponent } from 'react';
// material-ui
import styled from 'styled-components';
import DynamicTable, { Header } from 'components/DynamicTable';
import { IconButton } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';
import { LocalRecommendedService } from './types';

const RecommendedServicesList: FunctionComponent<Props>
  = ({ className, items, modelId, onEdit, onDelete }) =>
{

  const columnForModelId: Header<any>[] = [];
  if (modelId !== null) {
    columnForModelId.push({
      columnLabel: 'Modelo',
      cellAlignment: 'left',
      onRender: (_: LocalRecommendedService) => modelId
    });
  }

  return (
    <>
      <DynamicTable
        className={className}
        emptyState={
          <center className={'full-empty-state'}>
            <p>No hay servicios recomendados</p>
          </center>
        }
        headers={[
          ...columnForModelId,
          {
            columnLabel: 'Servicio',
            fieldName: 'serviceId',
            cellAlignment: 'left',
          },
          { columnLabel: 'Kilometraje', fieldName: 'mileage', cellAlignment: 'left' },
          { columnLabel: 'Tiempo de uso', fieldName: 'useTime', cellAlignment: 'left' }
        ]}
        rows={items}
        components={[
          (row: LocalRecommendedService, index: number) =>
            <IconButton
              key={`services-recommended-${index}-update`}
              color="primary"
              onClick={() => { onEdit(row, index) }}
            >
              <IconEdit />
            </IconButton>,
          (row: LocalRecommendedService, index: number) =>
            <IconButton
              key={`services-recommended-${index}-delete`}
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
  modelId?: string | null;
  className?: string;
  items: LocalRecommendedService[];
  onEdit: (service: LocalRecommendedService, index: number) => void;
  onDelete: (service: LocalRecommendedService, index: number) => void;
}

export default styled(RecommendedServicesList)`
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
