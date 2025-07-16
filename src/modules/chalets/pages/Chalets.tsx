import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MOCK_CHALETS, ITEMS_PER_PAGE } from '../utils/constants';
import type { ChaletsFilterParams, Chalet } from '../types';
import ChaletsFilters from '../components/filters/ChaletsFilters';
import ChaletsPagination from '../components/pagination/ChaletsPagination';
import { motion } from 'framer-motion';

const Chalets = () => {
  const location = useLocation();
  const chaletRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [filters, setFilters] = useState<ChaletsFilterParams>({
    page: 1,
    perPage: ITEMS_PER_PAGE,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter chalets based on search criteria
  const filteredChalets = MOCK_CHALETS.filter((chalet) => {
    if (filters.search && !chalet.name.includes(filters.search) && !chalet.description.includes(filters.search)) {
      return false;
    }
    if (filters.minPrice && chalet.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && chalet.price > filters.maxPrice) {
      return false;
    }
    if (filters.capacity && chalet.capacity < filters.capacity) {
      return false;
    }
    return true;
  });

  // Calculate pagination
  const totalItems = filteredChalets.length;
  const totalPages = Math.ceil(totalItems / filters.perPage);
  const startIndex = (currentPage - 1) * filters.perPage;
  const endIndex = startIndex + filters.perPage;
  const displayedChalets = filteredChalets.slice(startIndex, endIndex);

  // Ensure page is valid when filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handleFilterChange = (newFilters: ChaletsFilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    // Validate page number
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    
    // Only proceed if it's a different page
    if (validPage !== currentPage) {
      setCurrentPage(validPage);
    }
  };

  // Add effect to handle scrolling when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]); // This will trigger whenever currentPage changes

  // Track if we've handled the scroll
  const hasScrolledRef = useRef(false);

  // Update page when coming from details
  useEffect(() => {
    const state = location.state as { scrollToChaletId?: string } | null;
    if (state?.scrollToChaletId && !hasScrolledRef.current) {
      const chaletIndex = filteredChalets.findIndex(c => String(c.id) === state.scrollToChaletId);
      if (chaletIndex !== -1) {
        const page = Math.floor(chaletIndex / filters.perPage) + 1;
        if (page !== currentPage && page <= totalPages) {
          setCurrentPage(page);
        }
        hasScrolledRef.current = true;
      }
    }
  }, [location.state, filteredChalets, filters.perPage, currentPage, totalPages]);

  // Handle scrolling after page update
  useEffect(() => {
    const state = location.state as { scrollToChaletId?: string } | null;
    if (state?.scrollToChaletId && hasScrolledRef.current) {
      const chaletRef = chaletRefs.current[state.scrollToChaletId];
      if (chaletRef) {
        setTimeout(() => {
          chaletRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
          window.history.replaceState({}, document.title);
          hasScrolledRef.current = false;
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl" ref={contentRef}>
      <h1 className="text-3xl font-cairo font-bold text-gray-900 mb-8">الشاليهات</h1>
      
      <ChaletsFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedChalets.map((chalet) => (
          <motion.div
            key={chalet.id}
            ref={el => chaletRefs.current[String(chalet.id)] = el}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={chalet.images[0]}
                alt={chalet.name}
                className="w-full h-full object-cover"
              />
              {chalet.rating && (
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-sm font-cairo">
                  ⭐️ {chalet.rating}
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-cairo text-xl font-semibold mb-2">{chalet.name}</h3>
              <p className="text-gray-600 mb-3 line-clamp-2">{chalet.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-[#00B5E2] font-cairo font-semibold">
                  {chalet.price} ريال / ليلة
                </div>
                <div className="text-gray-500 text-sm">
                  👥 {chalet.capacity} أشخاص
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {chalet.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-[#00B5E2]/5 text-[#00B5E2] text-sm px-2 py-1 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                to={`/chalets/${String(chalet.id)}`}
                className="block w-full bg-[#00B5E2] hover:bg-[#33C3E7] text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                عرض التفاصيل
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <ChaletsPagination
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage: filters.perPage
        }}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Chalets; 