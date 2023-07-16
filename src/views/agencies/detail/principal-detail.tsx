import { FunctionComponent } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import Detail from './detail';
import { Agency } from 'core/agencies/types';

const PrincipalDetail: FunctionComponent<Props> = ({ className, agency, reload }) => {
  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          { 'Detalle de agencia ' + agency.businessName }
        </Typography>
      </MainCard>
      <Detail agency={agency} onRefresh={reload} />
    </div>
  );
};

interface Props {
  className?: string;
  agency: Agency;
  reload: () => void;
}

export default styled(PrincipalDetail)`
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

