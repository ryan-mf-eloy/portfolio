"use client";

import { env } from "@/env";

import { createContext, useState, useEffect, useCallback } from "react";
import { useRequest } from "@/hooks/use-request";

import { type KeyedMutator } from "swr";

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

interface RepositoriesContextProps {
  repositories: Repository[];
  mutate: KeyedMutator<any>;
  error: any;
  isLoading: boolean;
}

export const RepositoriesContext = createContext(
  {} as RepositoriesContextProps,
);

interface RepositoriesContextProviderProps {
  children: React.ReactNode;
}
export default function RepositoriesContextProvider({
  children,
}: RepositoriesContextProviderProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { data, ...rest } = useRequest({
    url: env.FETCH_GITHUB_REPOS_API_URL,
  });

  const removeUndefinedRepositories = useCallback(
    (repositories: Repository[]) =>
      repositories.filter((repository: Repository) => repository),
    [],
  );

  const orderRepositoriesByStars = useCallback(
    (repositories: Repository[], order: "DESC" | "ASC") => {
      return repositories.sort((a: Repository, b: Repository) => {
        if (order === "DESC") {
          return b.stars - a.stars;
        }
        return b.stars + a.stars;
      });
    },
    [],
  );

  const buildRepositoriesList = useCallback(() => {
    const isValidData = data && !data?.message;

    if (isValidData) {
      const builtRepositories: Repository[] = data.map(
        (gitHubResponse: GiHubAPIResponseDTO) => {
          const isIndexRepository = !gitHubResponse.topics.includes("index");

          if (isIndexRepository) {
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
        },
      );
      return builtRepositories;
    }
    return [];
  }, [data]);

  useEffect(() => {
    const builtRepositories = buildRepositoriesList();
    const filteredRepositories = removeUndefinedRepositories(builtRepositories);
    const orderedRepositories = orderRepositoriesByStars(
      filteredRepositories,
      "DESC",
    );

    setRepositories(orderedRepositories);
  }, [
    buildRepositoriesList,
    removeUndefinedRepositories,
    orderRepositoriesByStars,
  ]);

  return (
    <RepositoriesContext.Provider value={{ repositories, ...rest }}>
      {children}
    </RepositoriesContext.Provider>
  );
}
