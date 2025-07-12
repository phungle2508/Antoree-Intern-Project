import { useState, useEffect } from 'react';

export interface FilterState {
  category: string;
  level: string;
  priceRange: [number, number] | null;
  sort: string;
}

interface UseCourseFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  currentFilters?: FilterState;
}

export const useCourseFilters = ({ onFilterChange, onReset, currentFilters }: UseCourseFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    level: '',
    priceRange: null,
    sort: 'popular'
  });

  useEffect(() => {
    if (currentFilters) {
      console.log(currentFilters);
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetState = {
      category: '',
      level: '',
      priceRange: null,
      sort: 'popular'
    };
    setFilters(resetState);
    onReset();
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    filters,
    handleFilterChange,
    resetFilters,
    toggleFilters
  };
};
