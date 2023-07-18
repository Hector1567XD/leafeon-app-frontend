import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import Detail from './detail';
import useModelId from 'core/models/use-model-id';
import useModelById from 'core/models/use-model-by-id';

const ModelDetail: FunctionComponent<Props> = ({className}) => {
  const modelId = useModelId();
  const { model, reload } = useModelById(modelId);

  if (!model) return <></>;

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          { 'Detalle de modelo ' + model.modelId }
        </Typography>
      </MainCard>
      <Detail model={model} onRefresh={reload} />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(ModelDetail)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

