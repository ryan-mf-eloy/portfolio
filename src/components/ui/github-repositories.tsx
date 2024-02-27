'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
} from '@tabler/icons-react'

import maspImage from '@/public/masp.png'

export default function GitHubRepositories() {
  const apiRepositories = [
    {
      name: 'Masp',
      url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      techs: ['ReactJS', 'Typescript', 'NodeJS', 'Express'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis tempora vel eveniet autem architecto. Repudiandae omnis blanditiis vitae aperiam magnam eveniet nesciunt doloremque ab porro architecto ratione, labore temporibus.',
      projectLink: 'https://project.vercel.app',
      projectImage: maspImage.src,
      status: 'developing'
    },
    {
      name: 'KoiKin',
      url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      techs: ['Docker', 'SQL', 'NodeJS', 'Tailwind', 'Fastify', 'Firebase'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis tempora vel eveniet autem architecto. Repudiandae omnis blanditiis vitae aperiam magnam eveniet nesciunt doloremque ab porro architecto ratione, labore temporibus.',
      projectLink: 'https://project.vercel.app',
      projectImage: maspImage.src,
      status: 'developing'
    },
    {
      name: 'Odyssey',
      url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      techs: ['NextJS', 'SQL', 'Tests', 'CloudFlare', 'AWS', 'Tailwind'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore omnis tempora vel eveniet autem architecto. Repudiandae omnis blanditiis vitae aperiam magnam eveniet nesciunt doloremque ab porro architecto ratione, labore temporibus.',
      projectLink: 'https://project.vercel.app',
      projectImage: maspImage.src,
      status: 'completed'
    },
  ]

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [repositories, setRepositories] = useState<any[]>([])

  const MAX_RESULTS_PER_PAGE = 3
  const end = currentPage * MAX_RESULTS_PER_PAGE;
  const begin = currentPage === 1 ? 0 : end - MAX_RESULTS_PER_PAGE;
  const totalPages = Math.ceil(repositories.length / MAX_RESULTS_PER_PAGE);

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
  
  useEffect(() => {
    setRepositories(apiRepositories)
  }, [])

  const technologiesIcon = {
    ['ReactJS']: {
      Icon: IconBrandReact,
      color: 'text-blue-300',
    },
    ['Typescript']: {
      Icon: IconBrandTypescript,
      color: 'text-blue-500',
    },
    ['NodeJS']: {
      Icon: IconBrandNodejs,
      color: 'text-green-600',
    },
    ['Express']: {
      Icon: IconServer,
      color: 'text-zinc-500',
    },
    ['Docker']: {
      Icon: IconBrandDocker,
      color: 'text-blue-400',
    },
    ['SQL']: {
      Icon: IconSql,
      color: 'text-rose-500',
    },
    ['Tailwind']: {
      Icon: IconBrandTailwind,
      color: 'text-blue-400',
    },
    ['Fastify']: {
      Icon: IconServer,
      color: 'text-zinc-500',
    },
    ['Firebase']: {
      Icon: IconBrandFirebase,
      color: 'text-amber-400',
    },
    ['NextJS']: {
      Icon: IconBrandNextjs,
      color: 'text-primary',
    },
    ['Tests']: {
      Icon: IconTestPipe,
      color: 'text-indigo-500',
    },
    ['CloudFlare']: {
      Icon: IconBrandCloudflare,
      color: 'text-orange-500',
    },
    ['AWS']: {
      Icon: IconBrandAws,
      color: 'text-orange-400',
    },
  }

  return (
    <div className="h-full max-h-screen w-full overflow-hidden max-w-[30rem] flex flex-col justify-between">
      <motion.ul
        initial={{ y: 100, opacity: 0 }}
        animate={{y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="flex flex-col gap-2 max-h-[28rem] h-[28rem] w-full overflow-hidden">
        {
          repositories.slice(begin, end).map(({
            name, description, techs, url, projectLink, projectImage, status
          }, index) => (
              <li key={index} className="cursor-default flex items-center justify-center bg-gradient-to-r bg-zinc-200 dark:bg-zinc-900 hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[2000ms]">
                
                <div className="w-full h-full rounded-sm flex gap-5 items-center px-4 py-4 justify-center bg-zinc-100 dark:bg-zinc-950">
                  <div className="flex flex-col gap-2 items-start justify-center w-full">
                  
                  <h4 className="text-lg font-mono font-light">
                    {name}
                  </h4>

                  <p className="text-sm text-zinc-500 truncate max-w-80">
                    { description }
                  </p>
                  
                    <span className="flex gap-5">
                      {(techs as string[]).map((tech, index) => {
                      const { Icon, color } = technologiesIcon[tech as never]

                        return (
                          <div key={index}>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Icon className={`${color} transition-[2000ms]`} width={20} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{ tech }</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )
                    })}
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
                      <DrawerHeader className="flex flex-row gap-16 items-center justify-center py-5">
                        <div className="max-w-96">
                        <span className={`flex mb-3 w-fit uppercase bg-opacity-5 px-5 py-1 rounded-md ${status === 'developing' ? 'bg-yellow-500 text-yellow-500' : 'bg-green-500 text-green-500'}`}>
                            {status}
                          </span>
                          <DrawerTitle className="mb-5 text-4xl">{name}</DrawerTitle>
                            <span className="flex gap-5 my-3">
                              {(techs as string[]).map((tech, index) => {
                              const { Icon, color } = technologiesIcon[tech as never]
                                return (
                                  <div key={index}>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Icon className={`${color} transition-[2000ms]`} width={30} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{ tech }</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                )
                            })}
                          </span>
                          <DrawerDescription className="text-zinc-500 text-md">{description}</DrawerDescription>
                          <div className="flex gap-2 mt-5">
                            <strong>Access here:</strong>
                            <a className="text-yellow-500" href={projectLink} target="_blank">
                              {projectLink}
                            </a>
                          </div>
                        </div>
                        <div>
                          <Image src={projectImage} alt={name} width={600} height={600} />
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
                          <a className="p-2 w-10 h-10 text-zinc-400 hover:text-black dark:hover:text-white transition-[2000ms] flex items-center justify-center rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900" href={projectLink} target="_blank">
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

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center justify-start gap-2">
          <Button
            onClick={handlePrevPage}
            variant={currentPage !== 1 ? "outline" : "disabled"}
          >
            <IconChevronLeft width={20} />
            Prev
          </Button>

          <Button
            onClick={handleNextPage}
            variant={currentPage + 1 <= totalPages ? "outline" : "disabled"}
          >
            Next
            <IconChevronRight width={20} />
          </Button>
        </div>

        <small className="uppercase text-zinc-400">Page { currentPage }</small>
      </div>
    </div>
  );
}