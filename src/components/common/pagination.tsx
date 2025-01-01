import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/Utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show max 5 page numbers
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            className={cn(
              "min-w-[40px] h-10",
              currentPage === 1 && "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            1
          </Button>
          <span className="px-2">...</span>
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "primary" : "outline"}
          onClick={() => onPageChange(page)}
          className="min-w-[40px] h-10"
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="px-2">...</span>
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            className={cn(
              "min-w-[40px] h-10",
              currentPage === totalPages && "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}