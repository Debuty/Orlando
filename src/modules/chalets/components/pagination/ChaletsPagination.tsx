import type { ChaletsPaginationData } from "../../types";

interface ChaletsPaginationProps {
  pagination: ChaletsPaginationData;
  onPageChange: (page: number) => void;
}

const ChaletsPagination = ({ pagination, onPageChange }: ChaletsPaginationProps) => {
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-[#00B5E2]/5 text-[#00B5E2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#00B5E2]/10"
      >
        السابق
      </button>

      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              page === currentPage
                ? "bg-[#00B5E2] text-white"
                : "bg-[#00B5E2]/5 text-[#00B5E2] hover:bg-[#00B5E2]/10"
            }`}
          >
            {page}
          </button>
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
  );
};

export default ChaletsPagination; 