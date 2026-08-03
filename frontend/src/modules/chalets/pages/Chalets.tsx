import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../utils/constants';
import type { ChaletsFilterParams } from '../types';
import ChaletsFilters from '../components/filters/ChaletsFilters';
import ChaletsPagination from '../components/pagination/ChaletsPagination';
import ChaletCard from '../components/card/ChaletCard';
import { useGetChaletsQuery } from '../../shared/api/orlandoApi';

const Chalets = () => {
  const location = useLocation();
  const chaletRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [filters, setFilters] = useState<ChaletsFilterParams>({
    page: 1,
    perPage: ITEMS_PER_PAGE,
  });

  const queryArgs = useMemo(
    () => ({
      page: filters.page,
      perPage: filters.perPage,
      ...(filters.search?.trim() ? { search: filters.search.trim() } : {}),
      ...(filters.minPrice && filters.minPrice > 0
        ? { minPrice: filters.minPrice }
        : {}),
      ...(filters.maxPrice && filters.maxPrice > 0
        ? { maxPrice: filters.maxPrice }
        : {}),
      ...(filters.capacity && filters.capacity > 0
        ? { capacity: filters.capacity }
        : {}),
    }),
    [filters]
  );

  const { data, isLoading, isFetching, isError, error } =
    useGetChaletsQuery(queryArgs);

  const chalets = data?.items ?? [];
  const pagination = data?.pagination ?? {
    currentPage: filters.page,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: filters.perPage,
  };

  const handleFilterChange = (newFilters: ChaletsFilterParams) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, pagination.totalPages || 1));
    if (validPage !== filters.page) {
      setFilters((prev) => ({ ...prev, page: validPage }));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.page]);

  useEffect(() => {
    if (pagination.totalPages > 0 && filters.page > pagination.totalPages) {
      setFilters((prev) => ({ ...prev, page: pagination.totalPages }));
    }
  }, [pagination.totalPages, filters.page]);

  useEffect(() => {
    const state = location.state as { scrollToChaletId?: string } | null;
    const id = state?.scrollToChaletId;
    if (!id || !chalets.length) return;

    const el = chaletRefs.current[id];
    if (el) {
      const t = setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.history.replaceState({}, document.title);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [location.state, chalets]);

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-cairo font-bold text-gray-900 mb-8">
        الشاليهات
      </h1>

      <ChaletsFilters filters={filters} onFilterChange={handleFilterChange} />

      {isError && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
        >
          {(error && 'message' in error && String(error.message)) ||
            'تعذر تحميل الشاليهات. حاول مرة أخرى.'}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      ) : chalets.length === 0 ? (
        <div className="rounded-lg border border-gray-100 bg-white py-16 text-center text-gray-600">
          لا توجد شاليهات مطابقة حالياً.
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            isFetching ? 'opacity-70' : ''
          }`}
        >
          {chalets.map((chalet) => (
            <ChaletCard
              key={chalet.id}
              chalet={chalet}
              ref={(el) => {
                chaletRefs.current[chalet.id] = el;
              }}
            />
          ))}
        </div>
      )}

      {!isLoading && pagination.totalPages > 1 && (
        <ChaletsPagination
          pagination={{
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            totalItems: pagination.totalItems,
            itemsPerPage: pagination.itemsPerPage,
          }}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Chalets;
