import { useEffect, useState } from 'react';

const Loading = () => {
  const [loadTime, setLoadTime] = useState(0);
  const [showLoadTime, setShowLoadTime] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    
    // Show load time after 500ms to avoid flashing for quick loads
    const timeoutId = setTimeout(() => {
      setShowLoadTime(true);
    }, 500);

    return () => {
      // Calculate total load time when component unmounts
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      console.log(`Page loaded in: ${totalTime.toFixed(2)}ms`);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Update load time every 100ms
    const interval = setInterval(() => {
      setLoadTime(prev => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div className="mt-4 text-lg font-semibold text-gray-700">جاري التحميل...</div>
        {showLoadTime && (
          <div className="mt-2 text-sm text-gray-500">
            {(loadTime / 1000).toFixed(1)} ثواني
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading; 