import Image from "next/image";

import linkedinPhoto from "@/public/linkedin-photo.jpeg";

export default function Avatar() {
  return (
    <h1 className="text-6xl max-lg:text-4xl max-[1280px]:text-5xl font-light uppercase pb-3 flex gap-2 items-center">
      <span className="flex w-fit mb-3 p-[3px] rounded-lg bg-gradient-to-r from-rose-500 bg-yellow-500">
        <Image
          src={linkedinPhoto}
          alt="Ryan Eloy"
          width={150}
          height={150}
          className="rounded-md object-cover object-bottom h-16 w-16 max-sm:h-14 max-sm:w-14"
        />
      </span>
      <span className="mb-2.5">
        Ryan <b className="font-bold">Eloy</b>
      </span>
    </h1>
  );
}
