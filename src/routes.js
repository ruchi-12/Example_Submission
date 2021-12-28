import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../src/layouts/DashboardLayout';
import MainLayout from '../src/layouts/MainLayout';

import NotFoundView from '../src/views/errors/NotFoundView';

import ClientListView from '../src/views/clients/ClientListView';
import EditClientView from '../src/views/clients/EditClientView/EditClientView';
import AddClientView from '../src/views/clients/AddClientView/AddClientView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'users', element: <ClientListView /> },
      { path: '/', element: <Navigate to="/users" /> },
      { path: 'edit-user', element: <EditClientView /> },
      { path: 'add-user', element: <AddClientView /> },

      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '*', element: <Navigate to="/404" /> }  
    ]
  }
];

export default routes;
