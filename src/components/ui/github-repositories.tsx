'use client'

import { useLanguage } from "@/context/language-provider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSWR from 'swr'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Button from "./button";

import {
  IconExternalLink,
  IconMaximize,
  IconChevronRight,
  IconChevronLeft,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandReactNative,
  IconBrandNextjs,
  IconBrandCloudflare,
  IconBrandAws,
  IconBrandFirebase,
  IconTestPipe,
  IconBrandNodejs,
  IconBrandPrisma,
  IconBrandDocker,
  IconBox,
  IconBrandCss3,
  IconBrandTailwind,
  IconBrandMysql,
  IconSql,
  IconServer,
  IconBrandGraphql,
  IconBrandTerraform,
  IconBrandGoogle,
  IconBrandLinqpad,
  IconBrandStripe,
  IconBrandAzure
} from '@tabler/icons-react'

type TechnologyData = {
  [key: string]: {
    Icon: React.ComponentType<{ className: string, size: number }>;
    color: string;
  };
};

interface Repositories {
  name: string
  url: string
  stars: number
  techs: string[]
  description: string
  projectLink: string
  projectImage: string
  status: 'developing' | 'completed'
}

export default function GitHubRepositories() {
  const technologiesData: TechnologyData = {
    'reactjs': {
      Icon: IconBrandReact,
      color: 'text-blue-300',
    },
    'typescript': {
      Icon: IconBrandTypescript,
      color: 'text-blue-500',
    },
    'nodejs': {
      Icon: IconBrandNodejs,
      color: 'text-green-600',
    },
    'express': {
      Icon: IconServer,
      color: 'text-zinc-500',
    },
    'docker': {
      Icon: IconBrandDocker,
      color: 'text-blue-400',
    },
    'sql': {
      Icon: IconSql,
      color: 'text-rose-500',
    },
    'tailwindcss': {
      Icon: IconBrandTailwind,
      color: 'text-blue-400',
    },
    'fastify': {
      Icon: IconServer,
      color: 'text-zinc-500',
    },
    'firebase': {
      Icon: IconBrandFirebase,
      color: 'text-amber-400',
    },
    'nextjs': {
      Icon: IconBrandNextjs,
      color: 'text-primary',
    },
    'tests': {
      Icon: IconTestPipe,
      color: 'text-indigo-500',
    },
    'cloudflare': {
      Icon: IconBrandCloudflare,
      color: 'text-orange-500',
    },
    'aws': {
      Icon: IconBrandAws,
      color: 'text-orange-400',
    },
    'kubernetes': {
      Icon: IconBox,
      color: 'text-blue-600',
    },
    'graphql': {
      Icon: IconBrandGraphql,
      color: 'text-rose-500',
    },
    'prisma-orm': {
      Icon: IconBrandPrisma,
      color: 'text-blue-800',
    },
    'react-native': {
      Icon: IconBrandReactNative,
      color: 'text-violet-400',
    },
    'javascript': {
      Icon: IconBrandJavascript,
      color: 'text-yellow-500',
    },
    'css3': {
      Icon: IconBrandCss3,
      color: 'text-blue-400',
    },
    'mysql': {
      Icon: IconBrandMysql,
      color: 'text-blue-700',
    },
    'stripe': {
      Icon: IconBrandStripe,
      color: 'text-lime-600',
    },
    'lambda': {
      Icon: IconBrandLinqpad,
      color: 'text-red-500',
    },
    'google-cloud': {
      Icon: IconBrandGoogle,
      color: 'text-primary',
    },
    'terraform': {
      Icon: IconBrandTerraform,
      color: 'text-indigo-600',
    },
    'azure-cloud': {
      Icon: IconBrandAzure,
      color: 'text-blue-600',
    },
  }
   /**
   * Language
   */
   const { language } = useLanguage();
  /**
   * GitHub API Consumer (Next-SWR)
   */
  const [repositories, setRepositories] = useState<Repositories[]>([])

  const fetcher = (url: string) => fetch(url, { next: { revalidate: 60 }}).then((res) => res.json());
  const getRepositoriesAPIUrl = 'https://api.github.com/users/ryan-mf-eloy/repos'
  const { data, error, isLoading, mutate } = useSWR(
    getRepositoriesAPIUrl,
    fetcher,
  )

  useEffect(() => {
    if (data && !data?.message) {
      const builtRepositories: Repositories[] = data
        .map((gitHubResponse: any) => (
          {
            name: gitHubResponse.name,
            url: gitHubResponse.html_url,
            stars: gitHubResponse.stargazers_count,
            techs: gitHubResponse.topics,
            description: gitHubResponse.description,
            projectLink: gitHubResponse.homepage,
            projectImage: `https://raw.githubusercontent.com/ryan-mf-eloy/${gitHubResponse.name}/master/preview.png`,
            status: gitHubResponse.topics.includes('completed') ? 'completed' : 'developing'
          }))
        .sort((a: Repositories, b: Repositories) => a.stars - b.stars)
        .reverse()
      
      setRepositories(builtRepositories)
    }
  }, [data])
  /**
   * Pagination
   */
  const [currentPage, setCurrentPage] = useState<number>(1)

  const MAX_RESULTS_PER_PAGE = 3
  const end = currentPage * MAX_RESULTS_PER_PAGE;
  const begin = currentPage === 1 ? 0 : end - MAX_RESULTS_PER_PAGE;
  const totalPages = Math.ceil(repositories.length / MAX_RESULTS_PER_PAGE);
  const paginatedRepositories = repositories.slice(begin, end)

  const handlePrevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    const nextPage = currentPage + 1
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  }

  return (
    <div className="h-full max-h-screen max-xl:pb-10 w-full overflow-hidden max-w-[30rem] flex flex-col justify-between">
      <motion.ul
        initial={{ y: 100, opacity: 0 }}
        animate={{y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="flex flex-col gap-2 max-h-[28rem] h-[28rem] w-full overflow-hidden">
        {
          isLoading &&
          (<>
              <li role="status" className="animate-pulse bg-gradient-to-r bg-zinc-200 dark:bg-zinc-900 hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[2000ms]">
                <div className="flex flex-col items-start justify-center w-full h-full rounded-sm gap-5 px-4 py-4 bg-zinc-100 dark:bg-zinc-950">
                  <div className="h-5 bg-zinc-400 rounded-md dark:bg-zinc-700 w-20"></div>
                  <div className="h-3 bg-zinc-400 rounded-sm dark:bg-zinc-700 w-full max-w-80"></div>
                  <div className="flex gap-5">
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                  </div>
                </div>
              </li>
              <li role="status" className="animate-pulse bg-gradient-to-r bg-zinc-200 dark:bg-zinc-900 hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[2000ms]">
                <div className="flex flex-col items-start justify-center w-full h-full rounded-sm gap-5 px-4 py-4 bg-zinc-100 dark:bg-zinc-950">
                  <div className="h-5 bg-zinc-400 rounded-md dark:bg-zinc-700 w-20"></div>
                  <div className="h-3 bg-zinc-400 rounded-sm dark:bg-zinc-700 w-full max-w-80"></div>
                  <div className="flex gap-5">
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                  </div>
                </div>
              </li>
              <li role="status" className="animate-pulse bg-gradient-to-r bg-zinc-200 dark:bg-zinc-900 hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[2000ms]">
                <div className="flex flex-col items-start justify-center w-full h-full rounded-sm gap-5 px-4 py-4 bg-zinc-100 dark:bg-zinc-950">
                  <div className="h-5 bg-zinc-400 rounded-md dark:bg-zinc-700 w-20"></div>
                  <div className="h-3 bg-zinc-400 rounded-sm dark:bg-zinc-700 w-full max-w-80"></div>
                  <div className="flex gap-5">
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                    <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
                  </div>
                </div>
              </li>
            </>)
        }

        {error &&
          (
            <div className="flex select-none gap-5 items-center justify-center bg-rose-500 bg-opacity-5 p-4 w-fit text-rose-500 rounded-md">
              <h6>😥 Error to get GitHub repositories, please:</h6>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => mutate(getRepositoriesAPIUrl, {
                  revalidate: true,
                })}
                className="hover:bg-rose-500 hover:text-rose-500 hover:bg-opacity-10">
                Try again
              </Button>
          </div>
        )
        }

        { !isLoading && !error && paginatedRepositories.map(({
          name, description, techs, url, projectLink, projectImage, status
        }, index) => (
              <li key={index} className="cursor-default max-h-32 h-full flex items-center justify-center bg-gradient-to-r bg-zinc-200 dark:bg-zinc-900 hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[2000ms]">
                <div className="w-full h-full rounded-sm flex gap-5 items-center max-sm:px-16 px-4 py-4 justify-center bg-zinc-100 dark:bg-zinc-950">
                  <div className="flex flex-col gap-2 items-start justify-center w-full">
                  <h4 className="text-lg font-mono font-light">
                    {name}
                  </h4>
                  <p className="text-sm text-zinc-500 truncate max-w-80 max-sm:max-w-56">
                    { description }
                  </p>
                    <span className="flex gap-5">
                  {techs.map((tech, index) => {
                    if (technologiesData[tech]) {
                      const { Icon, color } = technologiesData[tech]

                        return (
                          <div key={index}>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="cursor-default">
                                  <Icon className={`${color} transition-[2000ms]`} size={25} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="capitalize">{ tech }</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )
                      }
                    })
                  }
                    </span>
                </div>
                <div className="flex items-center justify-end">
                  <Drawer>
                    <DrawerTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="p-2 w-10 h-10 text-zinc-400 hover:text-black dark:hover:text-white transition-[2000ms] flex items-center justify-center rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900">
                              <IconMaximize width={25} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preview</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="flex flex-row max-lg:flex-col max-lg:gap-5 gap-16 items-center justify-center py-5">
                        <div className="max-w-96 flex flex-col max-lg:items-center">
                          <span className={`flex mb-3 w-fit uppercase bg-opacity-5 px-5 py-1 rounded-md ${status === 'developing' ? 'bg-yellow-500 text-yellow-500' : 'bg-green-500 text-green-500'}`}>
                            {status}
                          </span>
                          <DrawerTitle className="mb-5 text-4xl max-sm:2xl max-md:text-3xl">{name}</DrawerTitle>
                            <span className="flex gap-5 my-3 max-lg:justify-center">
                          {techs.map((tech, index) => {
                              if (technologiesData[tech]) {
                                const { Icon, color } = technologiesData[tech]
          
                                  return (
                                    <div key={index}>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger className="cursor-default">
                                            <Icon className={`${color} transition-[2000ms]`} size={25} />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="capitalize">{ tech }</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  )
                                }
                            })}
                          </span>
                          <DrawerDescription className="text-zinc-500 text-md max-sm:text-sm">{description}</DrawerDescription>
                          <div className="flex gap-2 mt-5 max-lg:justify-center max-sm:text-md">
                            <strong>Access here:</strong>
                            <a className="text-yellow-500" href={projectLink || url} target="_blank">
                              {(projectLink || url).replace(/(https:\/\/|github.com\/)/gi, '')}
                            </a>
                          </div>
                        </div>
                        <div>
                        <Image
                          className="max-w-[600px] w-full max-lg:max-w-96 max-sm:px-2"
                          src={projectImage} alt={name} width={1500} height={1500}
                        />
                        </div>
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <a className="p-2 w-10 h-10 text-zinc-400 hover:text-black dark:hover:text-white transition-[2000ms] flex items-center justify-center rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900" href={projectLink || url} target="_blank">
                            <IconExternalLink width={25} />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Go to project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </li>
          ))
        }
      </motion.ul>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Button
            onClick={handlePrevPage}
            variant={currentPage !== 1 ? "outline" : "disabled"}>
              <IconChevronLeft width={20} />
              { language === 'en' ? 'Prev' : 'Anterior'}
          </Button>
          <Button
            onClick={handleNextPage}
            variant={currentPage + 1 <= totalPages ? "outline" : "disabled"}>
              { language === 'en' ? 'Next' : 'Próximo'}
              <IconChevronRight width={20} />
          </Button>
        </div>
        <small className="uppercase text-zinc-400">{ language === 'en' ? 'Page' : 'Página'} { currentPage }</small>
      </div>
    </div>
  );
}