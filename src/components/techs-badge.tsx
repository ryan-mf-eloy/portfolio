import { useFilterRepositories } from "@/hooks/use-filter-repositories";

import { IconX } from "@tabler/icons-react";

import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

export default function TechsBadge() {
  const { handleClearSelection, handleRemoveSelection, selectedTechs } =
    useFilterRepositories();

  return (
    <div className="flex gap-2 mb-2 w-full">
      <div className="w-full max-w-[25rem] max-sm:max-w-[18rem] rounded-sm py-2 px-1 flex gap-2 no-visible-scrollbar overflow-scroll">
        {selectedTechs.map((techSelected) => (
          <Badge
            key={techSelected}
            variant="outline"
            className="min-w-fit justify-between items-center gap-2 truncate"
          >
            {techSelected}
            <div>
              <IconX
                onClick={() => {
                  handleRemoveSelection(techSelected);
                }}
                size={15}
                className="cursor-pointer hover:text-rose-500"
              />
            </div>
          </Badge>
        ))}
      </div>

      {selectedTechs.length > 0 && (
        <div className="flex-1">
          <Button onClick={handleClearSelection} size="sm" variant="secondary">
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
