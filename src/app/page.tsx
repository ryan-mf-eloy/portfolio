'use client'

import Image from "next/image";
import { useLanguage } from "@/context/language-provider";

import ThemeToggle from "@/components/ui/theme-toggle";
import LanguageToggle from "@/components/ui/language-toggle";
import MovingBorderButton from "@/components/ui/moving-border-button";
import GitHubRepositories from "@/components/ui/github-repositories";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconBrandWhatsapp,
  IconDownload,
} from '@tabler/icons-react'

import linkedinPhoto from '@/public/linkedin-photo.jpeg'

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      <header className="flex flex-row items-center justify-end px-10 py-5 w-full max-h-32">
        <ThemeToggle />
        <LanguageToggle />
      </header>
      
      <main>
        <section className="flex flex-row items-center justify-center gap-80 w-full max-xl:flex-col max-xl:gap-10">
          <div className="max-w-[30vw] flex flex-col items-start justify-center max-sm:px-5 max-xl:max-w-full">
            <h3 className="text-lg pb-5">👋 { language === 'en' ? "Hi, I'm" : 'Olá, sou' }</h3>

            <h1 className="text-6xl max-lg:text-4xl max-[1280px]:text-5xl font-light uppercase pb-3 flex gap-2 items-center">
             <span className="flex w-fit mb-3 p-[3px] rounded-lg bg-gradient-to-r from-rose-500 bg-yellow-500">
              <Image src={linkedinPhoto} alt="Ryan Eloy" width={150} height={150} className="rounded-md grayscale object-cover object-bottom h-16 w-16 max-sm:h-14 max-sm:w-14" />
             </span>
             <span className="mb-2.5">Ryan <b className="font-bold">Eloy</b></span>
            </h1>

            <h2 className="text-2xl font-medium uppercase pb-5 max-lg:text-xl max-[1392px]:text-xl max-sm:text-[1.1rem]">
            { language === 'pt' && 'Desenvolvedor'} Full Stack <span className="text-yellow-500">Javascript</span> { language === 'en' && 'Developer'}
            </h2>

            <p className="text-zinc-400 font-light min-h-20 max-w-96 text-lg sm:text-md">
              {
              language === 'en'
                ? 'Passionate about technology with 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!'
                : 'Apaixonado por tecnologia com 5-6 anos de experiência na criação de aplicativos web escalonáveis ​​e eficientes. Movido por desafios!'
              }
            </p>

            <small className="mt-1 text-zinc-600">
              { language == 'en'
                ? 'I live in São Paulo, SP, Brazil'
                : 'Eu moro em São Paulo, SP, Brasil'
              }
            </small>

            <div className="flex gap-5 my-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href="https://github.com/ryan-mf-eloy" target="_blank">
                      <IconBrandGithub />
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
                      <IconBrandLinkedin />
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
                      <IconMail />
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
                      <IconBrandWhatsapp />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Whatsapp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <a href={`/cv/${language}/cv_ryan_eloy.pdf`} download>
              <MovingBorderButton className="gap-2">
                { language === 'en' ? 'Download Resume' : 'Baixar currículo' }
                <IconDownload size={18} />
              </MovingBorderButton>
            </a>
          </div>

          <div className="w-full max-w-[30rem] max-xl:border-t max-xl:pt-5 max-xl:items-center rounded-xl max-sm:px-5 flex flex-col items-start justify-center">
            <h2 className="text-3xl max-md:text-xl font-bold font-mono flex gap-2 mb-8 max-md:mb-3 items-center">
              <span className="text-yellow-500 font-bold capitalize text-4xl max-md:text-3xl">{'{'}</span>
              {
                language === 'en'
                ? 'Latest Projects'
                : 'Projetos recentes'
              }
              <span className="text-yellow-500 font-bold text-4xl max-md:text-3xl">{'}'}</span>
            </h2>
            <small className="text-zinc-400 flex mb-1">
              {
                language === 'en'
                ? 'From GitHub API'
                : 'Da API do GitHub'
              }
            </small>
            <GitHubRepositories />
          </div>
        </section>
      </main>
    </>
  );
}