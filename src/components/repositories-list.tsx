"use client";

import { env } from "@/env";

import { useEffect, useState } from "react";
import { useRepositories } from "@/hooks/use-repositories";
import { useFilterRepositories } from "@/hooks/use-filter-repositories";

import { motion } from "framer-motion";

import RepositoriesListErrorMessage from "./repositories-list-error-message";
import RepositoriesListSkeleton from "./repositories-list-skeleton";
import RepositoryItem from "./repository-item";
import Pagination from "./pagination";

export default function ProjectsList() {
  const { repositories, error, mutate, isLoading } = useRepositories();
  const { selectedTechs } = useFilterRepositories();

  /**
   * Pagination
   */
  const [currentPage, setCurrentPage] = useState<number>(1);

  const MAX_RESULTS_PER_PAGE = 3;
  const end = currentPage * MAX_RESULTS_PER_PAGE;
  const begin = currentPage === 1 ? 0 : end - MAX_RESULTS_PER_PAGE;
  const totalPages = Math.ceil(repositories.length / MAX_RESULTS_PER_PAGE);

  const filteredRepositories = repositories.filter((repository) => {
    const hasSelectedTechs = selectedTechs.length;

    if (hasSelectedTechs) {
      const repositoryWithSelectedTechs = repository.techs.some((tech) =>
        selectedTechs.includes(tech),
      );

      if (repositoryWithSelectedTechs) return repository;
      else return false;
    }

    return repository;
  });

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
  /**
   * Blur Animation
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
  useEffect(() => {
    const isTouchDevice = window.innerWidth <= 1024;
    setIsMobile(isTouchDevice);
  }, []);

  return (
    <>
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
            <RepositoriesListErrorMessage
              mutate={mutate}
              getRepositoriesAPIUrl={env.FETCH_GITHUB_REPOS_API_URL}
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </>
  );
}
