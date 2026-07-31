import type { ChaletsFilterParams } from "../../types";
import { Input } from "../../../shared/components/Input/Input";

interface ChaletsFiltersProps {
  filters: ChaletsFilterParams;
  onFilterChange: (filters: ChaletsFilterParams) => void;
}

const ChaletsFilters = ({ filters, onFilterChange }: ChaletsFiltersProps) => {
  const handleChange = (key: keyof ChaletsFilterParams, value: string | number) => {
    onFilterChange({
      ...filters,
      [key]: value,
      page: 1 // Reset to first page when filters change
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="font-cairo text-xl font-semibold mb-4">البحث والتصفية</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="البحث"
          placeholder="اسم أو وصف الشاليه"
          value={filters.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
        />
        
        <Input
          type="number"
          label="السعر الأدنى"
          placeholder="السعر من"
          value={filters.minPrice || ""}
          onChange={(e) => handleChange("minPrice", Number(e.target.value))}
        />
        
        <Input
          type="number"
          label="السعر الأقصى"
          placeholder="السعر إلى"
          value={filters.maxPrice || ""}
          onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
        />
        
        <Input
          type="number"
          label="عدد الأشخاص"
          placeholder="عدد الأشخاص"
          value={filters.capacity || ""}
          onChange={(e) => handleChange("capacity", Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ChaletsFilters; 