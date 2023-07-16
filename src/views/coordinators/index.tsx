import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import CoordinatorsCrudComponent from 'core/coordinators/crud'

const CoordinatorsCrud: FunctionComponent<Props> = ({ className }) => {
  return (<CoordinatorsCrudComponent fixedAgencyRif={null} />);
};

interface Props {
  className?: string;
}

export default styled(CoordinatorsCrud)``;
