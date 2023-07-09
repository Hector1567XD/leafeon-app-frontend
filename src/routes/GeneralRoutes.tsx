// project imports
import { RouteObject } from 'react-router';

// pages
// State
import States from 'views/states';
import CreateState from 'views/states/create';
import EditState from 'views/states/edit';
// City
import Cities from 'views/cities';
import CreateCity from 'views/cities/create';
import EditCity from 'views/cities/edit';
// Agency
import Agencies from 'views/agencies';
import CreateAgency from 'views/agencies/create';
import EditAgency from 'views/agencies/edit';

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
  // Agencias
  {
    path: 'agencies',
    element: <Agencies />
  },
  {
    path: 'agencies/create',
    element: <CreateAgency />
  },
  {
    path: 'agencies/edit/:id',
    element: <EditAgency />
  },
];

export default GeneralRoutes;
