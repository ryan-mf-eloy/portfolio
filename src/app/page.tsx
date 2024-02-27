'use client'

import Image from "next/image";
import Button from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import LanguageToggle from "@/components/ui/language-toggle";

import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconBrandWhatsapp,
  IconDownload,
} from '@tabler/icons-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import GitHubRepositories from "@/components/ui/github-repositories";

import linkedinPhoto from '@/public/linkedin-photo.jpeg'

export default function Home() {
  return (
    <>
      <header className="flex flex-row items-center justify-end px-10 py-5 w-full max-h-32">
        <ThemeToggle />
        <LanguageToggle />
      </header>
      
      <main>
        <section className="flex flex-row items-center justify-center gap-80 w-full">
          <div className="max-w-[30vw] flex flex-col items-start justify-center">
            <h3 className="text-lg pb-5">Hello, I&apos;m 👋</h3>

            <h1 className="text-6xl font-light uppercase pb-3 flex gap-2 items-center">
             <span className="flex w-fit mb-3 p-[3px] rounded-lg bg-gradient-to-r from-rose-500 bg-yellow-500">
              <Image src={linkedinPhoto} alt="Ryan Eloy" width={150} height={150} className="rounded-md grayscale object-cover object-bottom h-16 w-16" />
             </span>
             <span className="mb-2.5">Ryan <b className="font-bold">Eloy</b></span>
            </h1>

            <h2 className="text-2xl font-medium uppercase pb-5">
              Full Stack <span className="text-yellow-500">Javascript</span> Developer
            </h2>

            <p className="text-zinc-400 font-light">A passionate Node.js developer with over 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!
            </p>

            <small className="mt-1 text-zinc-600">I live in São Paulo, SP</small>

            <div className="flex gap-5 mt-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href="https://github.com/ryan-mf-eloy" target="_blank">
                      <IconBrandGithub width={25} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href="https://linkedin.com/in/ryan-eloy-5906b91a5" target="_blank">
                      <IconBrandLinkedin width={25} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href="mailto:math.eloy@hotmail.com" target="_blank">
                      <IconMail width={25} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>E-mail</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href="https://api.whatsapp.com/send?phone=5511973041534" target="_blank">
                      <IconBrandWhatsapp width={25} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Whatsapp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button className="mt-5 flex gap-2 items-center">
              Download Profile
              <IconDownload width={20} />
            </Button>
          </div>

          <div className="w-full max-w-[30rem] rounded-xl flex flex-col items-start justify-center">
            <h2 className="text-3xl font-bold font-mono flex gap-2 mb-8 items-center">
              <span className="text-yellow-500 font-bold capitalize text-4xl">{'{'}</span>
              Latest Projects
              <span className="text-yellow-500 font-bold text-4xl">{'}'}</span>
            </h2>
            <small className="text-zinc-400 flex mb-1">From GitHub API</small>
            <GitHubRepositories />
          </div>
        </section>
      </main>
    </>
  );
}
