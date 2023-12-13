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
import permission from "@/models/permission";
import { ResourceExtended } from '@/types/resource';
import { ResourceContext } from '@/context/resourcesTree';
import supabaseBrowser from '@/lib/supabase/supabase-browser';
import { PermissionExtended } from '@/types/permission';
import { PermissionContext } from '@/context/permission';

const Layout = ({ children } : { children: React.ReactNode}) => {
  
  const [resourcesData, setResourcesData] = useState<ResourceExtended[]>([])
  const [myPermissions, setMyPermissions] = useState<PermissionExtended[]>([]);
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
        getMyPermissions(res.data.session?.user.id || '');
      }
    });
  }, []);

  const getMyPermissions = async (user_id: string) => {
    const {data, error} = await permission.getByUser(user_id, supabaseBrowser);
    const permissionsData = data?.map((p: any) => permission.factory(p)) || [];
    console.log('My permissions: ', permissionsData);
    setMyPermissions(permissionsData);

  }

  const getResource = async () => {
    const {data, error} = await resource.getAll();
    if(error) {
      console.log(error);
    }
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
    <div className="flex justify-between h-full w-100vw bg-background-100 dark:bg-background-900">
      <div className="min-w-[20vw]">
        <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin"/>
      </div>
      {/* Navbar & Main Content */}
      <div className="h-full min-w-[75vw] font-dm dark:bg-navy-900">
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
              <PermissionContext.Provider value={{myPermissions, setMyPermissions}}>
                <div className="mx-auto ml-10 min-h-screen p-2 pl-[15px] !pt-[10px] md:p-2">
                  {children}
                </div>
    {/*         <div className="p-3">
                  <Footer />
                </div> */}
              </PermissionContext.Provider>
            </ResourceContext.Provider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
