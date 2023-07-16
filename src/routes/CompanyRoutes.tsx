// project imports
import { RouteObject } from 'react-router';

// Service
import Services from 'views/services';
import CreateService from 'views/services/create';
import EditService from 'views/services/edit';

const GeneralRoutes: RouteObject[] = [
  // Estados
  {
    path: 'services',
    element: <Services />
  },
  {
    path: 'services/create',
    element: <CreateService />
  },
  {
    path: 'services/edit/:id',
    element: <EditService />
  },
];

export default GeneralRoutes;
