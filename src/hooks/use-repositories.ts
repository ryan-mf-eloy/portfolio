"use client";

import { useContext } from "react";
import { RepositoriesContext } from "@/context/repositories-context";

export function useRepositories() {
  return useContext(RepositoriesContext);
}
