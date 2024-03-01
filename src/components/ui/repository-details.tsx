import Image from "next/image";
import { useLanguage } from "@/context/language-provider";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "./drawer";
import Button from "./button";

import { IconMaximize } from "@tabler/icons-react";

import { technologiesData } from "@/constants/technologies-data";

import { type Repository } from "@/app/page";

export default function RepositoryDetails({
  repository,
  onClose,
}: {
  repository: Repository;
  onClose?: () => void;
}) {
  const { language } = useLanguage();

  const { techs, url, description, name, status, projectImage, projectLink } =
    repository;

  let translatedStatus;

  if (language === "pt") {
    translatedStatus =
      status === "developing" ? "Em desenvolvimento" : "Finalizado";
  } else {
    translatedStatus = status;
  }

  return (
    <Drawer onClose={onClose}>
      <DrawerTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="p-2 w-10 h-10 text-zinc-400 hover:text-black dark:hover:text-white transition-[2000ms] flex items-center justify-center rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900">
                <IconMaximize width={25} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{language === "en" ? "Preview" : "Ver Prévia"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="flex flex-row max-lg:flex-col max-lg:gap-5 gap-16 items-center justify-center py-5">
          <div className="max-w-96 flex flex-col max-lg:items-center">
            <span
              className={`flex mb-3 w-fit uppercase bg-opacity-5 px-5 py-1 rounded-md ${status === "developing" ? "bg-yellow-500 text-yellow-500" : "bg-green-500 text-green-500"}`}
            >
              {translatedStatus}
            </span>

            <DrawerTitle className="mb-5 text-4xl max-sm:2xl max-md:text-3xl">
              {name}
            </DrawerTitle>

            <span className="flex gap-3 w-full max-w-80 overflow-x-auto no-visible-scrollbar my-3 max-lg:justify-center">
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

            <DrawerDescription className="text-zinc-500 max-[1023px]:text-center text-md max-sm:text-sm">
              {description}
            </DrawerDescription>

            <div className="flex gap-2 mt-5 max-lg:justify-center max-sm:text-md">
              <strong>
                {language === "en" ? "Access here" : "Acesse aqui"}:
              </strong>
              <a
                className="text-yellow-500"
                href={projectLink || url}
                target="_blank"
                rel="noreferrer"
              >
                {(projectLink || url).replace(
                  /(https:\/\/|github.com\/)/gi,
                  "",
                )}
              </a>
            </div>
          </div>

          <div>
            <Image
              className="max-w-[600px] bg-zinc-600 p-1 rounded-md w-full max-lg:max-w-96 max-sm:px-2"
              src={projectImage}
              priority
              alt={name}
              width={1500}
              height={1500}
            />
          </div>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">
              {language === "en" ? "Close" : "Fechar"}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
