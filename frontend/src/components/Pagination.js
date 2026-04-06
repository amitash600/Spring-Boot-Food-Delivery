import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  pageSize, 
  totalElements,
  loading = false 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(0, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages);
      
      for (let i = start; i < end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages && !loading) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1 && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  const startRecord = currentPage * pageSize + 1;
  const endRecord = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className="flex flex-col items-center space-y-4 py-6">
      {/* Records Info */}
      <div className="text-sm text-gray-600">
        Showing {startRecord} to {endRecord} of {totalElements} records
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0 || loading}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              disabled={loading}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {pageNum + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1 || loading}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Jump to Page */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-600">Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage + 1}
          onChange={(e) => {
            const page = parseInt(e.target.value) - 1;
            if (page >= 0 && page < totalPages && !loading) {
              onPageChange(page);
            }
          }}
          disabled={loading}
          className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        />
        <span className="text-gray-600">of {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
