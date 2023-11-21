'use client'
import routes from '@/routes';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import Navbar from './components/NavBar';
import { getActiveNavbar, getActiveRoute } from '@/util/navigation';

const Layout = ({ children } : { children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex justify-between h-full w-full bg-background-100 dark:bg-background-900">
      <div>
        <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin"/>
      </div>
      {/* Navbar & Main Content */}
      <div className="h-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[323px]`}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveNavbar(routes, pathname)}
            />
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {children}
            </div>
{/*         <div className="p-3">
              <Footer />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
