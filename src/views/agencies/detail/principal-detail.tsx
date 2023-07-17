import { FunctionComponent } from 'react';
// material-ui
import styled from 'styled-components';
import Detail from './detail';
import { Agency } from 'core/agencies/types';

const PrincipalDetail: FunctionComponent<Props> = ({ className, agency, reload }) => {
  return (
    <div className={className}>
      <Detail
        agency={agency}
        onRefresh={reload}
      />
    </div>
  );
};

interface Props {
  className?: string;
  agency: Agency;
  reload: () => void;
}

export default styled(PrincipalDetail)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
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

