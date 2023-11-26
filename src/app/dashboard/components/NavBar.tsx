import React, { useContext, useEffect } from 'react';
import Dropdown from './Dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from './NavLink';
import { FiSearch } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import avatar from '/public/img/avatars/avatar.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { get, set } from '@/lib/localStorage/storage';
import { Profile } from '@/types/profile';
import { user } from '@/models/auth';
import { factory, getById } from '@/models/profile';
import Link from 'next/link';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const [profile, setProfile] = React.useState<Profile>({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDarkmode(isDark());
      getSessionAndUser();
      setLoading(false);
    }
  }, []);

  
  const getSessionAndUser = async () => {
    const dataSession = (await user());
    const session = dataSession.data.session
    if (session) {
      const userId = `${session?.user.id}`;
      const {data, error} = await getById(userId);  
      if (data) {
        const profileData = factory(data[0]);
        setProfile(profileData);
      }
    }
  };

  const signOut = () => {
    fetch('/api/auth/sign-out', { method: "POST"})
    .then(async res => {
      const {data, error} = await res.json();
      if (data) {
        //router.replace('/authentication');
      }
    }).catch(error => console.error(error));
  
  }
 return ( !loading &&
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Página
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              toggleTheme();
              setDarkmode(false);
            } else {
              toggleTheme();
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <Image
              width="20"
              height="20"
              className="h-10 w-10 rounded-full"
              src={`https://picsum.photos/seed/${profile.first_name}/200/300`}
              alt="Avatar"
            />
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        >
          <div className="flex h-36 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  Olá, 
                  <span>
                      { ' '  + (profile.first_name) }
                  </span>
                </p>{' '}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="ml-4 mt-3 flex flex-col" 
            onClick={signOut} >
              <Link href={'/authentication'}>
                <button
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500">
                    Sair
                </button>
              </Link>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

 const toggleTheme = () => {
  const theme = get('theme');
  if(!theme || theme === 'light') {
      document.body.classList.remove('dark');
      set('theme', 'light');
  } else {
      document.body.classList.add('dark');
      set('theme', 'dark');
  }
}

const isDark = () => {
  const theme = get('theme');
  return (!theme || theme === 'light');
}

export default Navbar;

