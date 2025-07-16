import type { ChaletsPaginationData } from "../../types";

interface ChaletsPaginationProps {
  pagination: ChaletsPaginationData;
  onPageChange: (page: number) => void;
}

const ChaletsPagination = ({ pagination, onPageChange }: ChaletsPaginationProps) => {
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

  if (totalPages <= 1) return null;

  // Calculate the range of pages to show
  const getPageRange = () => {
    const range: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    range.push(1);

    // Calculate middle range
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if at the start
    if (currentPage <= 3) {
      end = Math.min(maxVisiblePages - 1, totalPages - 1);
    }

    // Adjust if at the end
    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - (maxVisiblePages - 2));
    }

    // Add ellipsis and range
    if (start > 2) range.push('...');
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    if (end < totalPages - 1) range.push('...');

    // Always show last page
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  // Calculate current items range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-8 space-y-4" dir="rtl">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-[#00B5E2]/5 text-[#00B5E2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#00B5E2]/10"
        >
          السابق
        </button>

        <div className="flex gap-2">
          {getPageRange().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  page === currentPage
                    ? "bg-[#00B5E2] text-white"
                    : "bg-[#00B5E2]/5 text-[#00B5E2] hover:bg-[#00B5E2]/10"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="w-10 h-10 flex items-center justify-center">
                {page}
              </span>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-[#00B5E2]/5 text-[#00B5E2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#00B5E2]/10"
        >
          التالي
        </button>
      </div>

      <div className="text-center text-sm text-gray-600">
        عرض {startItem} - {endItem} من {totalItems} شاليه
      </div>
    </div>
  );
};

export default ChaletsPagination; 