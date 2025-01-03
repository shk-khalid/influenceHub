import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    if (window.innerWidth < 640) { // Small screens
      if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
      if (currentPage === 1) return [1, 2];
      if (currentPage === totalPages) return [totalPages - 1, totalPages];
      return [currentPage - 1, currentPage, currentPage + 1];
    }
    
    // Medium screens and up
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0 sm:h-10 sm:w-10"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Mobile: Current Page Info */}
      {window.innerWidth < 640 && (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
      )}

      {/* First Page */}
      {currentPage > 3 && totalPages > 5 && window.innerWidth >= 640 && (
        <>
          <Button
            variant={currentPage === 1 ? "primary" : "outline"}
            onClick={() => onPageChange(1)}
            className="h-8 w-8 p-0 sm:h-10 sm:w-10"
          >
            1
          </Button>
          <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
        </>
      )}

      {/* Visible Pages */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "primary" : "outline"}
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 p-0 ${
            window.innerWidth >= 640 ? "inline-flex" : "hidden"
          } sm:h-10 sm:w-10`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      {/* Last Page */}
      {currentPage < totalPages - 2 && totalPages > 5 && window.innerWidth >= 640 && (
        <>
          <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
          <Button
            variant={currentPage === totalPages ? "primary" : "outline"}
            onClick={() => onPageChange(totalPages)}
            className="h-8 w-8 p-0 sm:h-10 sm:w-10"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0 sm:h-10 sm:w-10"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
