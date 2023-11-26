import Image from "next/image";

export function Peoples() {
    const array = [1,2,3];
    return (
        <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {array.map(key => (
              <span
                key={key}
                className="-mr-3 h-8 w-8 rounded-full border border-white dark:!border-navy-800"
              >
                <Image
                  width="2"
                  height="20"
                  className="h-full w-full rounded-full object-cover"
                  src={`https://picsum.photos/seed/${key}/200/300`}
                  alt=""
                />
              </span>
            ))}
          </div>
    );
}