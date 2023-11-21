import { FaHouse, FaSitemap, FaAddressBook } from 'react-icons/fa6';
import React from 'react';


const routes = [
  {
    name: 'Inicio',
    layout: '/dashboard',
    path: 'default',
    icon: <FaHouse  className="h-6 w-6" />,
  },
  {
    name: 'Recursos',
    layout: '/dashboard',
    path: 'resources',
    icon: <FaSitemap  className="h-6 w-6" />
  }
];

export default routes;
