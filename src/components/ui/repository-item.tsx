import { useLanguage } from "@/context/language-provider";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { IconExternalLink } from "@tabler/icons-react";

import { technologiesData } from "@/constants/technologies-data";
import RepositoryDetails from "./repository-details";

import { type Repository } from "@/app/page";
import { type Dispatch, type SetStateAction } from "react";

interface RepositoriesListProps {
  repository: Repository;
  isActive: boolean;
  isActiveList: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setActiveList: Dispatch<SetStateAction<boolean>>;
  setActiveListItem: Dispatch<SetStateAction<number | null>>;
}

export default function RepositoryItem({
  repository,
  onMouseEnter,
  onMouseLeave,
  isActive,
  isActiveList,
  setActiveList,
  setActiveListItem,
}: RepositoriesListProps) {
  const { language } = useLanguage();
  const { name, description, techs, url, projectLink } = repository;

  const handleDeactivateListAndLisItem = () => {
    setActiveList(false);
    setActiveListItem(null);
  };

  return (
    <li
      className="max-lg:hover:transform-none hover:scale-105 cursor-default max-h-48 h-full flex items-center justify-center bg-[#f8f8f8] dark:bg-[#040404] bg-gradient-to-r bg-transparent hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[1000ms]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full h-full relative overflow-hidden rounded-sm flex gap-5 items-center max-sm:px-16 px-4 py-4 justify-center bg-[#fafafa] dark:bg-[#010101]">
        {!isActive && isActiveList && (
          <div className="backdrop-blur-sm dark:bg-black/30 absolute top-0 right-0 bottom-0 left-0" />
        )}

        <div className="flex flex-col gap-2 items-start justify-center w-full">
          <h4 className="text-lg font-mono font-light">{name}</h4>

          <p className="text-sm text-zinc-500 truncate max-w-80 max-sm:max-w-56">
            {description}
          </p>

          <span className="flex gap-3 w-full max-w-80 max-sm:max-w-56 overflow-x-auto no-visible-scrollbar">
            {techs.map((tech, index) => {
              if (technologiesData[tech]) {
                const { Icon, color } = technologiesData[tech];
                return (
                  <div key={index}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-default">
                          <Icon
                            className={`${color} transition-[2000ms]`}
                            size={25}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="capitalize">{tech}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                );
              }
            })}
          </span>
        </div>

        <div className="flex items-center justify-end">
          <RepositoryDetails
            onClose={handleDeactivateListAndLisItem}
            repository={repository}
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  className="p-2 w-10 h-10 text-zinc-400 hover:text-black dark:hover:text-white transition-[2000ms] flex items-center justify-center rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900"
                  href={projectLink || url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconExternalLink width={25} />
                </a>
              </TooltipTrigger>

              <TooltipContent>
                <p>{language === "en" ? "Go To Project" : "Acessar Projeto"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </li>
  );
}
