import { useLanguage } from "@/context/language-provider";
import { type MouseEvent, useCallback } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarLabel,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import Badge from "@/components/ui/badge";

type ItemStatus = "studying" | "to study";

export default function ProjectsFilter({
  handleSelection,
  selectedTechs,
}: {
  handleSelection: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => void;
  selectedTechs: string[];
}) {
  const { language } = useLanguage();

  const handleItemStatus = useCallback(
    (status: ItemStatus) => {
      switch (status) {
        case "studying":
          return (
            <Badge variant="progress-outline">
              {language === "en" ? "Studying" : "Estudando"}
            </Badge>
          );
        case "to study":
          return (
            <Badge variant="waiting-outline">
              {language === "en" ? "To Study" : "Para estudar"}
            </Badge>
          );
      }
    },
    [language],
  );

  const getCustomSelectedOptionStyle = useCallback(
    (tech: string) => {
      const isSelected = selectedTechs.includes(tech);

      if (isSelected) {
        return "after:content-[''] after:h-3 after:w-3 after:rounded-sm after:bg-yellow-500 justify-between";
      }
    },
    [selectedTechs],
  );

  return (
    <Menubar className="max-sm:flex-1 max-sm:w-full justify-between">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-zinc-900 cursor-pointer transition-[2000ms] max-[400px]:text-[0.7rem]">
          Frameworks & Libraries
        </MenubarTrigger>
        <MenubarContent className="backdrop-blur-md bg-white/50 dark:bg-black/70 ">
          <div className="max-h-[25rem] overflow-auto overflow-x-hidden [&>div]:cursor-pointer [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-2">
            <MenubarLabel className="text-zinc-500">Back-End</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("nestjs")}
              data-value="nestjs"
              onClick={handleSelection}
            >
              NestJS
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("express")}
              data-value="express"
              onClick={handleSelection}
            >
              Express
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("fastify")}
              data-value="fastify"
              onClick={handleSelection}
            >
              Fastify
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("socket.io")}
              data-value="socket.io"
              onClick={handleSelection}
            >
              Socket.IO
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("prisma-orm")}
              data-value="prisma-orm"
              onClick={handleSelection}
            >
              PrismaORM
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("drizzle-orm")}
              data-value="drizzle-orm"
              onClick={handleSelection}
            >
              DrizzleORM
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("sequelize-orm")}
              data-value="sequelize-orm"
              onClick={handleSelection}
            >
              Sequelize
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("typeorm")}
              data-value="typeorm"
              onClick={handleSelection}
            >
              TypeORM
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Front-End</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("vite")}
              data-value="vite"
              onClick={handleSelection}
            >
              Vite
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("reactjs")}
              data-value="reactjs"
              onClick={handleSelection}
            >
              React
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("nextjs")}
              data-value="nextjs"
              onClick={handleSelection}
            >
              Next
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("redux")}
              data-value="redux"
              onClick={handleSelection}
            >
              Redux
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("tailwindcss")}
              data-value="tailwindcss"
              onClick={handleSelection}
            >
              Tailwind CSS
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("react-hook-form")}
              data-value="react-hook-form"
              onClick={handleSelection}
            >
              React Hook Form
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("storybook")}
              data-value="storybook"
              onClick={handleSelection}
            >
              Storybook
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Mobile</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("react-native")}
              data-value="react-native"
              onClick={handleSelection}
            >
              React Native
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Test</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("vitest")}
              data-value="vitest"
              onClick={handleSelection}
            >
              Vitest
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("jest")}
              data-value="jest"
              onClick={handleSelection}
            >
              Jest
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("eact-test-library")}
              data-value="react-test-library"
              onClick={handleSelection}
            >
              React Test Library
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("native-node-test")}
              data-value="native-node-test"
              onClick={handleSelection}
            >
              Native Node Test
            </MenubarItem>
          </div>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-zinc-900 cursor-pointer transition-[2000ms] max-[400px]:text-[0.7rem]">
          Technologies
        </MenubarTrigger>
        <MenubarContent className="backdrop-blur-md bg-white/50 dark:bg-black/70">
          <div className="max-h-[25rem] overflow-auto overflow-x-hidden [&>div]:cursor-pointer [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-2">
            <MenubarItem
              className={getCustomSelectedOptionStyle("nodejs")}
              data-value="nodejs"
              onClick={handleSelection}
            >
              NodeJS
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("html")}
              data-value="html"
              onClick={handleSelection}
            >
              HTML5
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("css3")}
              data-value="css3"
              onClick={handleSelection}
            >
              CSS3
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Languages</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("typescript")}
              data-value="typescript"
              onClick={handleSelection}
            >
              Typescript
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("javascript")}
              data-value="javascript"
              onClick={handleSelection}
            >
              Javascript
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">SQL</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("graphql")}
              data-value="graphql"
              onClick={handleSelection}
            >
              GraphQL
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("mysql")}
              data-value="mysql"
              onClick={handleSelection}
            >
              MySQL
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("postgresql")}
              data-value="postgresql"
              onClick={handleSelection}
            >
              PostgreSQL
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">NoSQL</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("mongodb")}
              data-value="mongodb"
              onClick={handleSelection}
            >
              MongoDB
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("redis")}
              data-value="redis"
              onClick={handleSelection}
            >
              Redis
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Others</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("firebase")}
              data-value="firebase"
              onClick={handleSelection}
            >
              Firebase
              {handleItemStatus("studying")}
            </MenubarItem>
          </div>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-zinc-900 cursor-pointer transition-[2000ms] max-[400px]:text-[0.7rem]">
          DevOps
        </MenubarTrigger>
        <MenubarContent>
          <div className="max-h-[20rem] overflow-auto overflow-x-hidden [&>div]:cursor-pointer [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-2">
            <MenubarLabel className="text-zinc-500">Cloud's</MenubarLabel>
            <MenubarSub>
              <MenubarSubTrigger>
                AWS (Amazon Web Services)
                {handleItemStatus("studying")}
              </MenubarSubTrigger>
              <MenubarSubContent className="backdrop-blur-md bg-white/50 dark:bg-black/70 relative max-sm:-right-[8rem] max-sm:-bottom-10">
                <MenubarItem
                  className={getCustomSelectedOptionStyle("ec2")}
                  data-value="ec2"
                  onClick={handleSelection}
                >
                  EC2
                </MenubarItem>
                <MenubarItem
                  className={getCustomSelectedOptionStyle("eks")}
                  data-value="eks"
                  onClick={handleSelection}
                >
                  EKS
                </MenubarItem>
                <MenubarItem
                  className={getCustomSelectedOptionStyle("sqs")}
                  data-value="sqs"
                  onClick={handleSelection}
                >
                  SQS
                </MenubarItem>
                <MenubarItem
                  className={getCustomSelectedOptionStyle("s3")}
                  data-value="s3"
                  onClick={handleSelection}
                >
                  S3
                </MenubarItem>
                <MenubarItem
                  className={getCustomSelectedOptionStyle("lambda")}
                  data-value="lambda"
                  onClick={handleSelection}
                >
                  Lambda
                </MenubarItem>
                <MenubarItem
                  className={getCustomSelectedOptionStyle("dynamo-db")}
                  data-value="dynamo-db"
                  onClick={handleSelection}
                >
                  DynamoDB
                </MenubarItem>
                <MenubarItem
                  className={getCustomSelectedOptionStyle("event-bridge")}
                  data-value="event-bridge"
                  onClick={handleSelection}
                >
                  Event Bridge
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">CI/CD</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("github-actions")}
              data-value="github-actions"
              onClick={handleSelection}
            >
              GitHub Actions
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("bitbucket-pipelines")}
              data-value="bitbucket-pipelines"
              onClick={handleSelection}
            >
              Bitbucket Pipelines
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("gitlab-pipelines")}
              data-value="gitlab-pipelines"
              onClick={handleSelection}
            >
              GitLab Pipelines
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("jenkins")}
              data-value="jenkins"
              onClick={handleSelection}
            >
              Jenkins
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Containers</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("docker")}
              data-value="docker"
              onClick={handleSelection}
            >
              Docker
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("kubernetes")}
              data-value="kubernetes"
              onClick={handleSelection}
            >
              Kubernetes
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarLabel className="text-zinc-500">Others</MenubarLabel>
            <MenubarItem
              className={getCustomSelectedOptionStyle("terraform")}
              data-value="terraform"
              onClick={handleSelection}
            >
              Terraform
              {handleItemStatus("to study")}
            </MenubarItem>
            <MenubarItem
              className={getCustomSelectedOptionStyle("ansible")}
              data-value="ansible"
              onClick={handleSelection}
            >
              Ansible
              {handleItemStatus("to study")}
            </MenubarItem>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
