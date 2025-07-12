import { useMemo } from "react";

export function usePagination(totalPages: number, currentPage: number) {
  return useMemo(() => {
    const items: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);
      if (currentPage > 3) items.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!items.includes(i)) items.push(i);
      }
      if (currentPage < totalPages - 2) items.push('...');
      if (!items.includes(totalPages)) items.push(totalPages);
    }
    return items;
  }, [totalPages, currentPage]);
}
