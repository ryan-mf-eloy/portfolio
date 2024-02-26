'use client'

import Image from "next/image";
import Button from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";

import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconBrandWhatsapp
} from '@tabler/icons-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import linkedinPhoto from '@/public/linkedin-photo.jpeg'

export default function Home() {
  return (
    <>
      <header className="flex flex-row items-center justify-end px-10 py-5 w-full max-h-32">
        <ThemeToggle />
      </header>
      
      <main>
        <section className="flex flex-row items-center justify-center gap-80">
          <div className="max-w-[30vw] flex flex-col items-start justify-center">
            <h3 className="text-lg pb-5">Hello, I&apos;m 👋</h3>
            <h1 className="text-6xl uppercase pb-3">Ryan <b>Eloy</b></h1>
            <h2 className="text-2xl font-medium uppercase pb-5">
              Full Stack <span className="text-yellow-500">Javascript</span> Developer
            </h2>
            <p className="text-zinc-400 font-light">
              I&apos;m a full stack developer with a passion for building beautiful,
              user-friendly web applications. I&apos;ve worked with a wide range of
              technologies, from front-end to back-end, and I&apos;m always eager to
              learn new ones.
            </p>

            <div className="flex gap-5 mt-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a href="" target="_blank">
                      <Button size={"icon"} variant={"outline"}>
                        <IconBrandGithub width={25} />
                      </Button>
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
                    <a href="" target="_blank">
                      <Button size={"icon"} variant={"outline"}>
                        <IconBrandLinkedin width={25} />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Linkedin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a href="" target="_blank">
                      <Button size={"icon"} variant={"outline"}>
                        <IconMail width={25} />
                      </Button>
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
                  <a href="" target="_blank">
                    <Button size={"icon"} variant={"outline"}>
                      <IconBrandWhatsapp width={25} />
                    </Button>
                  </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Whatsapp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button className="mt-5">Download CV</Button>
          </div>

          <div style={{
            backgroundImage: `url(${linkedinPhoto.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
          className="w-[30rem] h-[30rem] rounded-xl"
          >
          </div>
        </section>
      </main>
    </>
  );
}
