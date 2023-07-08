import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'components/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from 'menu-items';
import { setMenu } from 'store/customizationSlice';

// assets
import { IconChevronRight } from '@tabler/icons';
import { useAppSelector } from 'store';
import { CustomedTheme } from 'themes';
import MainComponent from './MainComponent';

const showCustomization = false;

const MainLayout = () => {
  const theme = useTheme<CustomedTheme>();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useAppSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch(setMenu(!leftDrawerOpened));
  };

  const isAuthenticated = useAppSelector((state) => state.auth.isAuth);
  if (!isAuthenticated) {
    window.location.href = window.location.origin + '/pages/login';
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <MainComponent theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs
          separator={IconChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
          {
          /*TODO: Add bellow attrbiutes as "optional"*/
            ...{}
          }
          card={undefined}
          divider={undefined}
          icons={undefined}
          maxItems={undefined}
          titleBottom={undefined}
        />
        <Outlet />
      </MainComponent>
      {showCustomization && <Customization />}
    </Box>
  );
};

export default MainLayout;
