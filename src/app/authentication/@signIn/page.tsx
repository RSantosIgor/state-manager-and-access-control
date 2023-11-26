"use client";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ToastAlert } from "@/app/components/toastAlert";


interface User {
  email: string
  password: string
}

export default function SignIn() {
  const { register, formState: { errors }, handleSubmit } = useForm<User>();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const router = useRouter();

  const handleSignIn = async (data: User) => {
    const {email, password} = data;
    if(email && password) {
      fetch('/api/auth/sign-in', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })
      .then(async res => {
        const {data, error} = await res.json();
        if (data) {
          router.replace('/dashboard');
        } if (error) {
          setOpen(true);
          setMsg('Algo deu errado. Tente mais tarde.');
        }
      }).catch((error) => {
        console.error('Error SignIn', error)
      });
    }
  }

  useEffect(()=> {
    router.prefetch('/dashboard');
  });

  const handleClose = () => {
    setOpen(false);
  }
    return (
      <div>
        <ToastAlert open={open} handleClose={handleClose} msg={msg} severity='error'/>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center leading-9 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
            Entrar na minha conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-5">
            <label htmlFor="email" className="block text-sm font-medium leading-6 font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
              Email
            </label>
              <input
              {...register("email", { required: "Email Address is required" })} aria-invalid={errors.email ? "true" : "false"} 
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block font-medium leading-6 text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
                  Senha
                </label>
                  <a href="#" className="font-semibold text-sm hover:text-indigo-500 text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
                    Esqueci minha senha 
                  </a>
              </div>
                <input
                {...register("password", { required: "Password is required" })} aria-invalid={errors.password ? "true" : "false"}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {errors.password && <p role="alert">{String(errors.password?.message)}</p>} 
              <button 
                onClick={handleSubmit(handleSignIn)} 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-white hover:underline dark:text-white dark:hover:text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Entrar
              </button>
          </form>
        </div>
      </div>
    );
}