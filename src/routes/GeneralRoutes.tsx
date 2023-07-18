// project imports
import { RouteObject } from 'react-router';

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
import DetailAgency from 'views/agencies/detail';
//Models
import Models from 'views/models';
import CreateModel from 'views/models/create';
import EditModel from 'views/models/edit';
import DetailModel from 'views/models/detail';
//Job
import Jobs from 'views/jobs';
import CreateJob from 'views/jobs/create';
import EditJob from 'views/jobs/edit';
//Managers
import Managers from 'views/managers';
import CreateManager from 'views/managers/create';
import EditManager from 'views/managers/edit';
//Clients
import Clients from 'views/clients';
import CreateClient from 'views/clients/create';
import EditClient from 'views/clients/edit';
//Coordinadores
import Coordinators from 'views/coordinators';
//Stocks / Inventarios
import Stocks from 'views/stocks';

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
  {
    path: 'agencies/detail/:id',
    element: <DetailAgency />
  },
  // Modelos
  {
    path: 'models',
    element: <Models />
  },
  {
    path: 'models/create',
    element: <CreateModel />
  },
  {
    path: 'models/edit/:id',
    element: <EditModel />
  },
  {
    path: 'models/detail/:id',
    element: <DetailModel />
  },
  //Cargos
  {
    path: 'jobs',
    element: <Jobs />
  },
  {
    path: 'jobs/create',
    element: <CreateJob />
  },
  {
    path: 'jobs/edit/:id',
    element: <EditJob />
  },
  //Encargados
  {
    path: 'managers',
    element: <Managers />
  },
  {
    path: 'managers/create',
    element: <CreateManager />
  },
  {
    path: 'managers/edit/:id',
    element: <EditManager />
  },
  //Clientes
  {
    path: 'clients',
    element: <Clients />
  },
  {
    path: 'clients/create',
    element: <CreateClient />
  },
  {
    path: 'clients/edit/:id',
    element: <EditClient />
  },
  //Coordinadores
  {
    path: 'coordinators',
    element: <Coordinators />
  },
  //Inventario
  {
    path: 'inventory',
    element: <Stocks />
  }
];

export default GeneralRoutes;
