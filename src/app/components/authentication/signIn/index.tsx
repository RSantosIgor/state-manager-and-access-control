'use client'
import supabase from "@/lib/supabase/supabase-browser";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";

interface User {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm<User>();

  const handleSignIn = async (data: User) => {
    console.log(data);
    if(data.email && data.password) {
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      router.refresh()
    }
  }

    return (
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Entrar na minha conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
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
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Senha
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Esqueci minha senha 
                  </a>
                </div>
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}