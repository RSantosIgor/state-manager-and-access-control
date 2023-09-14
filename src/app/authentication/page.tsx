"use client";
import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import SignIn from "../components/authentication/signIn";
import SignUp from "../components/authentication/signUp";

export const metadata: Metadata = {
  title: "Authentication"
}

export default function AuthenticationPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toogleSign = () => {
    setIsSignIn(!isSignIn);
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
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            TCC Project
          </div>
        </div>
        <div className="lg:p-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {isSignIn ? <SignIn/>: <SignUp/>}
            <p className="mt-10 text-center text-sm text-gray-200">
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