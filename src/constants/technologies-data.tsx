import {
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandVite,
  IconBrandVscode,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandNodejs,
  IconServer,
  IconBrandDocker,
  IconSql,
  IconBrandTailwind,
  IconBrandFirebase,
  IconBrandNextjs,
  IconTestPipe,
  IconBrandCloudflare,
  IconBrandAws,
  IconBox,
  IconBrandGraphql,
  IconBrandPrisma,
  IconBrandReactNative,
  IconBrandJavascript,
  IconBrandCss3,
  IconBrandMysql,
  IconBrandStripe,
  IconBrandLinqpad,
  IconBrandGoogle,
  IconBrandTerraform,
  IconBrandAzure,
  IconBrandRust,
} from "@tabler/icons-react";

export type TechnologyData = Record<
  string,
  {
    Icon: React.ComponentType<{ className: string; size: number }>;
    color: string;
  }
>;

export const technologiesData: TechnologyData = {
  rust: {
    Icon: IconBrandRust,
    color: "text-red-500",
  },
  "github-actions": {
    Icon: IconBrandGithub,
    color: "text-zinc-400",
  },
  html: {
    Icon: IconBrandHtml5,
    color: "text-orange-500",
  },
  vite: {
    Icon: IconBrandVite,
    color: "text-violet-400",
  },
  vitest: {
    Icon: IconBrandVite,
    color: "text-green-400",
  },
  vscode: {
    Icon: IconBrandVscode,
    color: "text-blue-700",
  },
  reactjs: {
    Icon: IconBrandReact,
    color: "text-blue-300",
  },
  typescript: {
    Icon: IconBrandTypescript,
    color: "text-blue-500",
  },
  nodejs: {
    Icon: IconBrandNodejs,
    color: "text-green-600",
  },
  express: {
    Icon: IconServer,
    color: "text-zinc-500",
  },
  docker: {
    Icon: IconBrandDocker,
    color: "text-blue-400",
  },
  sql: {
    Icon: IconSql,
    color: "text-rose-500",
  },
  tailwindcss: {
    Icon: IconBrandTailwind,
    color: "text-blue-400",
  },
  fastify: {
    Icon: IconServer,
    color: "text-zinc-500",
  },
  firebase: {
    Icon: IconBrandFirebase,
    color: "text-amber-400",
  },
  nextjs: {
    Icon: IconBrandNextjs,
    color: "text-primary",
  },
  tests: {
    Icon: IconTestPipe,
    color: "text-indigo-500",
  },
  cloudflare: {
    Icon: IconBrandCloudflare,
    color: "text-orange-500",
  },
  aws: {
    Icon: IconBrandAws,
    color: "text-orange-400",
  },
  kubernetes: {
    Icon: IconBox,
    color: "text-blue-600",
  },
  graphql: {
    Icon: IconBrandGraphql,
    color: "text-rose-500",
  },
  "prisma-orm": {
    Icon: IconBrandPrisma,
    color: "text-blue-800",
  },
  "react-native": {
    Icon: IconBrandReactNative,
    color: "text-violet-400",
  },
  javascript: {
    Icon: IconBrandJavascript,
    color: "text-yellow-500",
  },
  css3: {
    Icon: IconBrandCss3,
    color: "text-blue-400",
  },
  mysql: {
    Icon: IconBrandMysql,
    color: "text-blue-700",
  },
  stripe: {
    Icon: IconBrandStripe,
    color: "text-lime-600",
  },
  lambda: {
    Icon: IconBrandLinqpad,
    color: "text-red-500",
  },
  "google-cloud": {
    Icon: IconBrandGoogle,
    color: "text-primary",
  },
  terraform: {
    Icon: IconBrandTerraform,
    color: "text-indigo-600",
  },
  "azure-cloud": {
    Icon: IconBrandAzure,
    color: "text-blue-600",
  },
};
