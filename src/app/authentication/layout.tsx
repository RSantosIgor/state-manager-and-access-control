import { Metadata } from "next";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get } from '@/lib/localStorage/storage';
import { user } from "@/models/auth";

export default function Layout({
    signIn,
    signUp,
  }: {
    signIn: React.ReactNode
    signUp: React.ReactNode
  }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const toogleSign = () => {
    setIsSignIn(!isSignIn);
  }

  const pathname = usePathname();
  const router = useRouter();

  useEffect (()=> {
    router.prefetch('/dashboard');
    user()
    .then(res => {
      const isLoggedIn = Boolean(res.data.session);
      middlewareAuth(pathname, isLoggedIn);
    });
  }, []);

  const middlewareAuth = (path: string, isLoggedIn: boolean) => {
    const layout = path.split('/')[1];
    console.log(isLoggedIn);
    if (layout === 'dashboard' && !isLoggedIn) {
      router.replace('/authentication');
      //redirect('/authentication')
        
    } else if (layout === 'authentication' && isLoggedIn) {
      router.replace('/dashboard');
      //redirect('/dashboard')
    }
  }

  return (
    <>
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          onClick={toogleSign}
          href="#"
          className={
            "absolute right-4 top-4 md:right-8 md:top-8"
          }
        >
          {isSignIn ? 'Cadastrar': 'Entrar'}
        </Link>
        <div className="relative hidden h-full flex-col p-10 lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="ml-1 mt-1 h-2.5 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
            <p>Trabalho</p> 
            <p>
                de conclusão
                <span className="font-tangerine text-[10px]"> By Igor Rosa</span>
            </p> 
          </div>
        </div>
        <div className="lg:p-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            { isSignIn ? signIn: signUp }
            <p className="mt-10 text-center text-sm text-navy-700 dark:text-white">
              {isSignIn ? 'Não tenho uma conta ': 'Já tenho uma conta '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={toogleSign}>
                {isSignIn ? 'fazer uma nova conta': 'entrar na minha conta'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}