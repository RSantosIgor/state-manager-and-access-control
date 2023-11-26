'use client'
import routes from '@/routes';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './components/SideBar';
import Navbar from './components/NavBar';
import { getActiveNavbar, getActiveRoute } from '@/util/navigation';
import { get } from '@/lib/localStorage/storage';
import { user } from '@/models/auth';

const Layout = ({ children } : { children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect (()=> {
    user()
    .then(res => {
      const isLoggedIn = Boolean(res.data.session);
      middlewareAuth(pathname, isLoggedIn);
    });
  }, []);

  const middlewareAuth = (path: string, isLoggedIn: boolean) => {
    const layout = path.split('/')[1];
    if (layout === 'dashboard' && !isLoggedIn) {
      router.replace('/authentication');
      //redirect('/authentication')
        
    } else if (layout === 'authentication' && isLoggedIn) {
      router.replace('/dashboard');
      //redirect('/dashboard')
    }
  }


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
