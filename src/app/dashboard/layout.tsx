'use client'
import routes from '@/routes';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './components/SideBar';
import Navbar from './components/NavBar';
import { getActiveNavbar, getActiveRoute } from '@/util/navigation';
import { get } from '@/lib/localStorage/storage';
import { user } from '@/models/auth';
import resource, { getResourcesTree } from "@/models/resource";
import company from "@/models/company";
import unit from "@/models/unit";
import departament from "@/models/departament";
import { ResourceExtended } from '@/types/resource';
import { ResourceContext } from '@/context/resourcesTree';

const Layout = ({ children } : { children: React.ReactNode}) => {
  
  const [resourcesData, setResourcesData] = useState<ResourceExtended[]>([])
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect (()=> {
    user()
    .then(res => {
      const isLoggedIn = Boolean(res.data.session);
      middlewareAuth(pathname, isLoggedIn);
      if(isLoggedIn) {
        getResource();
      }
    });
  }, []);

  const getResource = async () => {
    const {data, error} = await resource.getAll();
    const companies = await getCompanies();
    const units = await getUnits();
    const departaments = await getDepartaments();
    const resourceTree = await getResourcesTree(data || [], [...companies, ...units, ...departaments]);
    
    setResourcesData(resourceTree);
    console.log(resourceTree);
  }

  const getCompanies = async () => {
    const {data, error} = await company.getAll();
    if(data) {
      return data.map(d => company.factory(d));
    } else if (error) {
      console.log(error);
    }
    return [];
  }

  const getUnits = async () => {
    const {data, error} = await unit.getAll();
    if(data) {
      return data.map(d => unit.factory(d));;
    } else if (error) {
      console.log(error);
    }
    return [];
  }

  const getDepartaments = async () => {
    const {data, error} = await departament.getAll();
    if(data) {
      return data.map(d => departament.factory(d));;
    } else if (error) {
      console.log(error);
    }
    return [];
  }

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
    <div className="flex justify-center h-full w-full bg-background-100 dark:bg-background-900">
      <div className="min-w-[25vw]">
        <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin"/>
      </div>
      {/* Navbar & Main Content */}
      <div className="h-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-navy-900 
              md:pr-2`}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveNavbar(routes, pathname)}
            />
            <ResourceContext.Provider value={{resourcesResourceExtended: resourcesData, setResourceExtended: setResourcesData}}>
              <div className="mx-auto min-h-screen min-w-[74vw] p-2 !pt-[10px] md:p-2">
                {children}
              </div>
  {/*         <div className="p-3">
                <Footer />
              </div> */}
            </ResourceContext.Provider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
