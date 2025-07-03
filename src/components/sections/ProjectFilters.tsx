import { Box } from "@mui/material";
import React from "react";
import { ServiceType } from "../../lib/types";
import { FilterBtn } from "../buttons";

interface ProjectFiltersProps {
  activeFilter: ServiceType | "Alle";
  setActiveFilter: (v: ServiceType | "Alle") => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const handleFilterClick = (f: ServiceType | "Alle") => {
    setActiveFilter(f);
  };

  return (
    <Box display="flex" flexWrap="wrap" rowGap="20px">
      {[
        "Alle",
        ServiceType.BYGGINREDNING,
        ServiceType.ENTREPRENØR,
        ServiceType.RENOVERING,
        ServiceType.SERVICEOPPDRAG,
      ].map((filter) => (
        <FilterBtn
          onClick={() => handleFilterClick(filter as any)}
          title={filter}
          active={activeFilter === filter}
          key={filter}
        />
      ))}
    </Box>
  );
};
