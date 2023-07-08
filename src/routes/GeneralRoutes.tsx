// project imports
import { RouteObject } from 'react-router';

// pages
import States from 'views/states';
import CreateState from 'views/states/create';
import EditState from 'views/states/edit';
import Cities from 'views/cities';
import CreateCity from 'views/cities/create';
import EditCity from 'views/cities/edit';

const GeneralRoutes: RouteObject[] = [
  // Estados
  {
    path: 'states',
    element: <States />
  },
  {
    path: 'states/create',
    element: <CreateState />
  },
  {
    path: 'states/edit/:id',
    element: <EditState />
  },
  // Ciudades
  {
    path: 'cities',
    element: <Cities />
  },
  {
    path: 'cities/create',
    element: <CreateCity />
  },
  {
    path: 'cities/edit/:id',
    element: <EditCity />
  },
];

export default GeneralRoutes;
