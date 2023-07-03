// material-ui
import { Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import Table from './table';

const SamplePage = () => {
  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quis in qui nemo.
        Nesciunt iure quidem ullam iste nulla, alias numquam aliquid
        architecto praesentium molestias officia incidunt enim, ipsa repellat.
      </Typography>
      <Table />
    </MainCard>
  );
};

export default SamplePage;
