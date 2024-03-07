"use client";

import { type MouseEvent, createContext, useState, useCallback } from "react";

interface FilterRepositoriesContextProps {
  selectedTechs: string[];
  handleSelection: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => void;
  handleRemoveSelection: (selection: string) => void;
  handleClearSelection: () => void;
}

export const FilterRepositoriesContext = createContext(
  {} as FilterRepositoriesContextProps,
);

interface FilterRepositoriesContextProviderProps {
  children: React.ReactNode;
}
export default function FilterRepositoriesContextProvider({
  children,
}: FilterRepositoriesContextProviderProps) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const handleSelection = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      const selectedTech = (event.target as HTMLInputElement).dataset.value;

      if (selectedTech) {
        setSelectedTechs((prevState) => {
          const techAlreadySelected = prevState.includes(selectedTech);

          if (techAlreadySelected) {
            return prevState.filter((tech) => tech !== selectedTech);
          }
          return [...prevState, selectedTech];
        });
      }
    },
    [setSelectedTechs],
  );

  const handleRemoveSelection = useCallback(
    (selection: string) => {
      setSelectedTechs((prevState) => {
        const techAlreadySelected = prevState.includes(selection);

        if (techAlreadySelected) {
          return prevState.filter((tech) => tech !== selection);
        }

        return prevState;
      });
    },
    [setSelectedTechs],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedTechs([]);
  }, [setSelectedTechs]);

  return (
    <FilterRepositoriesContext.Provider
      value={{
        selectedTechs,
        handleSelection,
        handleClearSelection,
        handleRemoveSelection,
      }}
    >
      {children}
    </FilterRepositoriesContext.Provider>
  );
}
