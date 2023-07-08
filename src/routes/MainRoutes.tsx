import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import { RouteObject } from 'react-router';

// pages
import States from 'views/states';
import Logout from 'views/logout';
import Cities from 'views/cities';
import CreateState from 'views/states/create';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'states',
      element: <States />
    },
    {
      path: 'cities',
      element: <Cities />
    },
    {
      path: 'states/create',
      element: <CreateState />
    },
    {
      path: 'logout',
      element: <Logout />
    }
  ]
};

export default MainRoutes;
