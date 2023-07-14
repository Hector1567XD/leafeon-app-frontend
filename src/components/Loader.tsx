import { FunctionComponent } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// styles
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
}) as any;

const Loader: FunctionComponent = () => {
  return (
    <LoaderWrapper>
      <LinearProgress color="primary" />
    </LoaderWrapper>
  )
};

export default Loader;
