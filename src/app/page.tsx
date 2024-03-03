"use client";

import { useLanguage } from "@/context/language-provider";
import { useState, useEffect, type MouseEvent } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";

import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Avatar from "@/components/ui/avatar";
import Social from "@/components/ui/social";
import Header from "@/components/ui/header";
import ProjectsFilter from "@/components/ui/projects-filter";
import RepositoryItem from "@/components/ui/repository-item";
// import CertificationTag from "@/components/ui/certification-tag";
import MovingBorderButton from "@/components/ui/moving-border-button";
import FetchRepositoriesErrorMessage from "@/components/ui/fetch-repositories-error-message";
import RepositoriesListSkeleton from "@/components/ui/repositories-list-skeleton";

import {
  IconDownload,
  IconChevronRight,
  IconChevronLeft,
  IconX,
} from "@tabler/icons-react";

export interface Repository {
  id: number;
  name: string;
  url: string;
  stars: number;
  techs: string[];
  description: string;
  projectLink: string;
  projectImage: string;
  status: "developing" | "completed";
}
export interface GiHubAPIResponseDTO {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  topics: string[];
  description: string;
  homepage: string;
}

export default function Home() {
  /**
   * Language
   */
  const { language } = useLanguage();
  /**
   * Mouse animation with ignoring mobile touch
   */
  const [activeListItem, setActiveListItem] = useState<number | null>(null);
  const [activeList, setActiveList] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleOnMouseInList = (value: boolean) => {
    if (!isMobile) {
      setActiveList(value);
    }
  };
  const handleOnMouseInListItem = (value: number | null) => {
    if (!isMobile) {
      setActiveListItem(value);
    }
  };
  /**
   * GitHub API Consumer (Next-SWR)
   */
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const fetcher = async (url: string) =>
    fetch(url, { next: { revalidate: 60 } }).then(async (res) => res.json());

  const fetchReposGitHubAPIUrl =
    "https://api.github.com/users/ryan-mf-eloy/repos";

  const { data, error, isLoading, mutate } = useSWR(
    fetchReposGitHubAPIUrl,
    fetcher,
  );

  useEffect(() => {
    const isTouchDevice = window.innerWidth <= 1024;
    setIsMobile(isTouchDevice);
  }, []);

  useEffect(() => {
    const isValidData = data && !data?.message;

    if (isValidData) {
      const orderedByStarsRepositories: Repository[] = data
        .map((gitHubResponse: GiHubAPIResponseDTO) => {
          const isToShowRepository = !gitHubResponse.topics.includes("index");

          if (isToShowRepository) {
            const isCompletedProject =
              gitHubResponse.topics.includes("completed");

            const builtRepository: Repository = {
              id: gitHubResponse.id,
              name: gitHubResponse.name,
              url: gitHubResponse.html_url,
              stars: gitHubResponse.stargazers_count,
              techs: gitHubResponse.topics,
              description: gitHubResponse.description,
              projectLink: gitHubResponse.homepage,
              projectImage: `https://raw.githubusercontent.com/ryan-mf-eloy/${gitHubResponse.name}/master/preview.png`,
              status: isCompletedProject ? "completed" : "developing",
            };

            return builtRepository;
          }
          return undefined;
        })
        .filter((repository: Repository) => repository)
        .sort((a: Repository, b: Repository) => b.stars - a.stars);

      setRepositories(orderedByStarsRepositories);
    }
  }, [data]);
  /**
   * Filter
   */
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const handleSelection = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    const selectedTech = (event.target as HTMLInputElement).dataset.value;

    if (selectedTech) {
      setSelectedTechs((prevState) => {
        const techAlreadySelected = prevState.includes(selectedTech);

        if (techAlreadySelected) {
          return prevState.filter((tech) => tech !== selectedTech);
        }
        return [...prevState, selectedTech];
      });
    }
  };

  const handleRemoveSelection = (selection: string) => {
    setSelectedTechs((prevState) => {
      const techAlreadySelected = prevState.includes(selection);

      if (techAlreadySelected) {
        return prevState.filter((tech) => tech !== selection);
      }

      return prevState;
    });
  };

  const handleClearSelection = () => {
    setSelectedTechs([]);
  };
  /**
   * Pagination
   */
  const [currentPage, setCurrentPage] = useState<number>(1);

  const MAX_RESULTS_PER_PAGE = 3;
  const end = currentPage * MAX_RESULTS_PER_PAGE;
  const begin = currentPage === 1 ? 0 : end - MAX_RESULTS_PER_PAGE;
  const totalPages = Math.ceil(repositories.length / MAX_RESULTS_PER_PAGE);

  const filteredRepositories = repositories.filter((repository) =>
    selectedTechs.length
      ? repository.techs.some((tech) => selectedTechs.includes(tech))
      : repository,
  );

  const paginatedRepositories = filteredRepositories.slice(begin, end);

  const handlePrevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

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

            {/* <div className="mb-5">
              <CertificationTag />
            </div> */}

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
              {language === "en" ? "Latest Projects" : "Projetos recentes"}
              <span className="text-yellow-500 font-bold text-4xl max-md:text-3xl">
                {"}"}
              </span>
            </h2>

            <div className="mb-2 max-[420px]:m-0 max-sm:mt-5 flex items-center justify-between w-full max-sm:flex-col max-sm:items-start">
              <ProjectsFilter
                selectedTechs={selectedTechs}
                handleSelection={handleSelection}
              />

              <small className="text-zinc-400 flex text-[0.7rem] max-sm:mb-2 max-sm:mt-5">
                {language === "en" ? "From GitHub API" : "Da API do GitHub"}
              </small>
            </div>

            <div className="flex gap-2 mb-2 w-full">
              <div className="w-full max-w-[25rem] max-sm:max-w-[18rem] rounded-sm py-2 px-1 flex gap-2 no-visible-scrollbar overflow-scroll">
                {selectedTechs.map((techSelected) => (
                  <Badge
                    key={techSelected}
                    variant="outline"
                    className="min-w-fit justify-between items-center gap-2 truncate"
                  >
                    {techSelected}
                    <div>
                      <IconX
                        onClick={() => {
                          handleRemoveSelection(techSelected);
                        }}
                        size={15}
                        className="cursor-pointer hover:text-rose-500"
                      />
                    </div>
                  </Badge>
                ))}
              </div>

              {selectedTechs.length > 0 && (
                <div className="flex-1">
                  <Button
                    onClick={handleClearSelection}
                    size="sm"
                    variant="secondary"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>

            <div className="max-h-[30rem] h-[30rem] max-xl:mb-10 w-full max-w-[30rem] flex flex-col justify-between">
              <motion.ul
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="flex flex-col gap-2 max-h-[24rem] h-fill w-full"
                onMouseEnter={() => {
                  handleOnMouseInList(true);
                }}
                onMouseLeave={() => {
                  handleOnMouseInList(false);
                }}
              >
                {isLoading && <RepositoriesListSkeleton length={3} />}

                {error && (
                  <FetchRepositoriesErrorMessage
                    mutate={mutate}
                    getRepositoriesAPIUrl={fetchReposGitHubAPIUrl}
                  />
                )}

                {paginatedRepositories.map((repository, index) => (
                  <RepositoryItem
                    key={repository.id}
                    repository={repository}
                    isActiveList={activeList}
                    isActive={activeListItem === index}
                    setActiveList={setActiveList}
                    setActiveListItem={setActiveListItem}
                    onMouseEnter={() => {
                      handleOnMouseInListItem(index);
                    }}
                    onMouseLeave={() => {
                      handleOnMouseInListItem(null);
                    }}
                  />
                ))}
              </motion.ul>

              <div className="flex items-center justify-between max-sm:mt-20 max-sm:pb-5">
                <div className="flex items-center justify-start gap-2">
                  <Button
                    onClick={handlePrevPage}
                    variant={currentPage !== 1 ? "outline" : "disabled"}
                  >
                    <IconChevronLeft width={20} />
                    {language === "en" ? "Prev" : "Anterior"}
                  </Button>

                  <Button
                    onClick={handleNextPage}
                    variant={
                      currentPage + 1 <= totalPages ? "outline" : "disabled"
                    }
                  >
                    {language === "en" ? "Next" : "Próximo"}
                    <IconChevronRight width={20} />
                  </Button>
                </div>
                <small className="uppercase text-zinc-400">
                  {language === "en" ? "Page" : "Página"} {currentPage}
                </small>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
