import { useState, useMemo } from "react";
import type { ChaletsFilterParams, ChaletsPaginationData } from "../types";
import { MOCK_CHALETS, ITEMS_PER_PAGE } from "../utils/constants";
import ChaletCard from "../components/card/ChaletCard";
import ChaletsFilters from "../components/filters/ChaletsFilters";
import ChaletsPagination from "../components/pagination/ChaletsPagination";

const Chalets = () => {
  const [filters, setFilters] = useState<ChaletsFilterParams>({
    page: 1,
    perPage: ITEMS_PER_PAGE
  });

  // Filter and paginate chalets
  const { filteredChalets, pagination } = useMemo(() => {
    let result = [...MOCK_CHALETS];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        chalet =>
          chalet.name.toLowerCase().includes(searchLower) ||
          chalet.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.minPrice) {
      result = result.filter(chalet => chalet.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      result = result.filter(chalet => chalet.price <= filters.maxPrice!);
    }

    if (filters.capacity) {
      result = result.filter(chalet => chalet.capacity >= filters.capacity!);
    }

    // Calculate pagination
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / filters.perPage);
    const startIndex = (filters.page - 1) * filters.perPage;
    const endIndex = startIndex + filters.perPage;

    const paginationData: ChaletsPaginationData = {
      currentPage: filters.page,
      totalPages,
      totalItems,
      itemsPerPage: filters.perPage
    };

    return {
      filteredChalets: result.slice(startIndex, endIndex),
      pagination: paginationData
    };
  }, [filters]);

  const handleFilterChange = (newFilters: ChaletsFilterParams) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-cairo font-bold tracking-tight text-gray-900 mb-4">
          جميع الشاليهات
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اكتشف مجموعتنا المميزة من الشاليهات الفاخرة المصممة لتوفير تجربة إقامة لا تُنسى
        </p>
      </div>

      <ChaletsFilters filters={filters} onFilterChange={handleFilterChange} />

      {filteredChalets.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-cairo text-gray-600">
            لم يتم العثور على شاليهات تطابق معايير البحث
          </h3>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChalets.map(chalet => (
              <ChaletCard key={chalet.id} chalet={chalet} />
            ))}
          </div>

          <ChaletsPagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Chalets; 