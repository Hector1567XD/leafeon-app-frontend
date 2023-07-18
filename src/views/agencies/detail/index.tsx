import { FunctionComponent, useState } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import styled from 'styled-components';
import PrincipalDetail from './principal-detail';
import { Box, Tabs, Typography, Tab, Card } from '@mui/material';
import CoordinatorsCrudComponent from 'core/coordinators/crud';
import useAgencyRif from 'core/agencies/use-agency-rif';
import useAgencyByRif from 'core/agencies/use-agency-by-rif';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DetailWrapper: FunctionComponent<Props> = ({ className }) => {
  const [value, setValue] = useState(0);

  const agencyRif = useAgencyRif();
  const { agency, reload } = useAgencyByRif(agencyRif);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  if (!agency) return <></>;

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          { agency.agencyRif + ' | Detalle de agencia ' + agency.businessName }
        </Typography>
      </MainCard>
      <br />
      <Card
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Agencia" {...a11yProps(0)} />
          <Tab label="Coordinadores" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} className={'tab-complete-width'} index={0}>
          <PrincipalDetail agency={agency} reload={reload} />
        </TabPanel>
        <TabPanel value={value} className={'tab-complete-width'} index={1}>
          <CoordinatorsCrudComponent
            header={
              <span>
                Coordinadores
              </span>
            }
            fixedAgencyRif={agency.agencyRif}
          />
        </TabPanel>
      </Card>
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(DetailWrapper)`
  .tab-complete-width {
    width: 100%;
  }
`;
