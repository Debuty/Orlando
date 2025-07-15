import React from 'react';

interface LocationMapProps {
  title: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-cairo font-semibold mb-6">{title}</h2>
      <div className="h-[300px] bg-gray-200 rounded-lg">
        {/* Add your map component here */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          خريطة الموقع
        </div>
      </div>
    </div>
  );
};

export default LocationMap; 