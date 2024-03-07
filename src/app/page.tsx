"use client";

import { useLanguage } from "@/hooks/use-language";
import FilterRepositoriesContextProvider from "@/context/filter-repositories-context";

import Avatar from "@/components/ui/avatar";
import Social from "@/components/ui/social";
import Header from "@/components/ui/header";
import MovingBorderButton from "@/components/ui/moving-border-button";
import TechsBadge from "@/components/techs-badge";
import ProjectsList from "@/components/repositories-list";
import ProjectsFilter from "@/components/repositories-filter";

import { IconDownload } from "@tabler/icons-react";
import RepositoriesContextProvider from "@/context/repositories-context";

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      <Header className="absolute" />

      <main className="flex items-center jutify-center min-h-screen max-xl:pt-8">
        <section className="flex flex-row items-center justify-center gap-80 w-full max-xl:flex-col max-xl:gap-10">
          <div className="max-w-[30vw] flex flex-col items-start justify-center max-sm:px-5 max-xl:max-w-full">
            <h3 className="text-lg pb-5">
              👋 {language === "en" ? "Hi, I'm" : "Olá, sou"}
            </h3>

            <Avatar />

            <h2 className="text-2xl font-medium uppercase pb-5 max-lg:text-xl max-[1392px]:text-xl max-sm:text-[1.1rem]">
              {language === "pt" && "Desenvolvedor"} Full Stack{" "}
              <span className="text-yellow-500">Javascript</span>{" "}
              {language === "en" && "Developer"}
            </h2>

            <p className="text-zinc-400 font-light min-h-20 max-w-96 text-lg sm:text-md">
              {language === "en"
                ? "Passionate about technology with 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!"
                : "Apaixonado por tecnologia com 5-6 anos de experiência na criação de aplicativos web escalonáveis ​​e eficientes. Movido por desafios!"}
            </p>

            <small className="mt-1 text-zinc-600">
              {language === "en"
                ? "I live in São Paulo, SP, Brazil"
                : "Eu moro em São Paulo, SP, Brasil"}
            </small>

            <Social />

            <a href={`/cv/${language}/cv_ryan_eloy.pdf`} download>
              <MovingBorderButton className="gap-2">
                {language === "en" ? "Download Resume" : "Baixar currículo"}
                <IconDownload size={18} />
              </MovingBorderButton>
            </a>
          </div>

          <div className="w-full max-w-[30rem] max-xl:border-t max-xl:pt-5 max-xl:items-center rounded-xl max-sm:px-5 flex flex-col items-start justify-center">
            <h2 className="text-3xl max-md:text-xl font-bold font-mono flex gap-2 mb-8 max-md:mb-3 items-center">
              <span className="text-yellow-500 font-bold capitalize text-4xl max-md:text-3xl">
                {"{"}
              </span>
              <span className="font-light">
                {language === "en" ? "Latest Projects" : "Projetos recentes"}
              </span>
              <span className="text-yellow-500 font-bold text-4xl max-md:text-3xl">
                {"}"}
              </span>
            </h2>

            <RepositoriesContextProvider>
              <FilterRepositoriesContextProvider>
                <div className="mb-2 max-[420px]:m-0 max-sm:mt-5 flex items-center justify-between w-full max-sm:flex-col max-sm:items-start">
                  <ProjectsFilter />

                  <small className="text-zinc-400 flex text-[0.7rem] max-sm:mb-2 max-sm:mt-5">
                    {language === "en" ? "From GitHub API" : "Da API do GitHub"}
                  </small>
                </div>

                <TechsBadge />

                <ProjectsList />
              </FilterRepositoriesContextProvider>
            </RepositoriesContextProvider>
          </div>
        </section>
      </main>
    </>
  );
}
