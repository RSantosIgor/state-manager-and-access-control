"use client";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { set } from '@/lib/localStorage/storage';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { ToastAlert } from '@/app/components/toastAlert';


interface User {
  first_name: string,
  last_name: string,
  photoUrl: string,
  email: string
  password: string
}


export default function SignUp() {
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm<User>();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSignUp = async (data: User) => {
    const {first_name, last_name, email, password} = data;
    fetch('/api/auth/sign-up', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({first_name, last_name, email, password, photo_url: ''}),
    })
    .then(async res => {
      const {data, error} = await res.json();
      if (data) {
        router.replace('/dashboard');
      } if (error) {
        setOpen(true);
        setMsg('Algo deu errado. Tente mais tarde.');
      }
    })
    .catch(error => console.error(error));
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
          <h2  className="mt-10 text-center leading-9 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
            Cadastrar conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
                Nome
              </label>
              <div className="mt-2">
                <input
                {...register("first_name", { required: "Name is required" })} aria-invalid={errors.first_name ? "true" : "false"}
                  id="first_name"
                  name="first_name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
                Sobrenome
              </label>
              <div className="mt-2">
                <input
                {...register("last_name")} aria-invalid={errors.last_name ? "true" : "false"}
                  id="last_name"
                  name="last_name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
                Email
              </label>
              <div className="mt-2">
              <input
                {...register("email", { required: "Email Address is required" })} aria-invalid={errors.email ? "true" : "false"} 
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p role="alert">{String(errors.email?.message)}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
                  Senha
                </label>
              </div>
              <div className="mt-2">
              <input
                {...register("password", { required: "Password is required" })} aria-invalid={errors.password ? "true" : "false"}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {errors.password && <p role="alert">{String(errors.password?.message)}</p>}
              </div>
            </div>
              <button 
                onClick={handleSubmit(handleSignUp)} 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-white hover:underline dark:text-white dark:hover:text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Cadastrar e Entrar
              </button>
          </form>
        </div>
      </div>
    );
}