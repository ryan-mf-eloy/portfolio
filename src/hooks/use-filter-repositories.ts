"use client";

import { useContext } from "react";
import { FilterRepositoriesContext } from "@/context/filter-repositories-context";

export function useFilterRepositories() {
  return useContext(FilterRepositoriesContext);
}
