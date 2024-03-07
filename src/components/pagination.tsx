"use client";

import { useLanguage } from "@/hooks/use-language";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import Button from "./ui/button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}: PaginationProps) {
  const { language } = useLanguage();

  return (
    <div className="flex items-center justify-between max-sm:mt-20 max-sm:pb-5">
      <div className="flex items-center justify-start gap-2">
        <Button
          onClick={handlePrevPage}
          variant={currentPage !== 1 ? "outline" : "disabled"}
        >
          <IconChevronLeft width={20} />
          {language === "en" ? "Prev" : "Anterior"}
        </Button>

        <Button
          onClick={handleNextPage}
          variant={currentPage + 1 <= totalPages ? "outline" : "disabled"}
        >
          {language === "en" ? "Next" : "Próximo"}
          <IconChevronRight width={20} />
        </Button>
      </div>
      <small className="uppercase text-zinc-400">
        {language === "en" ? "Page" : "Página"} {currentPage}
      </small>
    </div>
  );
}
