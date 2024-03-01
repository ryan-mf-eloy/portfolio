import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export default function Social() {
  return (
    <div className="flex gap-5 my-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <a
              className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              href="https://github.com/ryan-mf-eloy"
              target="_blank"
              rel="noreferrer"
            >
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
            <a
              className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              href="https://linkedin.com/in/ryan-eloy-5906b91a5"
              target="_blank"
              rel="noreferrer"
            >
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
            <a
              className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              href="mailto:math.eloy@hotmail.com"
              target="_blank"
              rel="noreferrer"
            >
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
            <a
              className="border p-2 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              href="https://api.whatsapp.com/send?phone=5511973041534"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandWhatsapp />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Whatsapp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
