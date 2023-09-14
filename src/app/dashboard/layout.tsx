import Image from "next/image"
import { MainNav } from "@/app/dashboard/components/main-nav";
import { UserNav } from "@/app/dashboard/components/user-nav";;


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <div className="md:hidden">
    {/* <Image
            src="/examples/dashboard-light.png"
            width={1280}
            height={866}
            alt="Dashboard"
            className="block dark:hidden"
            />
            <Image
            src="/examples/dashboard-dark.png"
            width={1280}
            height={866}
            alt="Dashboard"
            className="hidden dark:block"
            /> */}
        </div>
        <div className="hidden flex-col md:flex">
            <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                <UserNav />
                </div>
            </div>
            </div>
            {children}
        </div>
    </>
  )
}

