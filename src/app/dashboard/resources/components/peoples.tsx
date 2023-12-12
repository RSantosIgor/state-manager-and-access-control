import Image from "next/image";

export function Peoples({profiles = []}: {profiles: any[]}) {
    const array = profiles.slice(0, 2) || [];
    return (
        <div className="flex flex-row-reverse md:mt-2 mr-5 lg:mt-0">
            {
              profiles.length > 3 && 
              <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
                + {profiles.length - array.length}
              </span>
            }
            {array.map((p, index) => (
              <span
                key={index}
                className="-mr-3 h-8 w-8 rounded-full border border-white dark:!border-navy-800"
                title={p.first_name}
              >
                <Image
                  width="2"
                  height="20"
                  className="h-full w-full rounded-full object-cover"
                  src={`https://picsum.photos/seed/${p.first_name}/200/300`}
                  alt=""
                />
              </span>
            ))}
          </div>
    );
}