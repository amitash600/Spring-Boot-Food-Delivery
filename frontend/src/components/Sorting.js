import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const Sorting = ({ currentSort, onSortChange, options, disabled = false }) => {
  const handleSortClick = (field) => {
    if (disabled) return;
    
    let newOrder = 'asc';
    if (currentSort.field === field && currentSort.order === 'asc') {
      newOrder = 'desc';
    }
    
    onSortChange({ field, order: newOrder });
  };

  const getSortIcon = (field) => {
    if (currentSort.field !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    
    return currentSort.order === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-primary-600" />
      : <ArrowDown className="h-4 w-4 text-primary-600" />;
  };

  const getButtonClass = (field) => {
    const baseClass = "flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200";
    
    if (disabled) {
      return `${baseClass} bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed`;
    }
    
    if (currentSort.field === field) {
      return `${baseClass} bg-primary-50 border-primary-300 text-primary-700 hover:bg-primary-100`;
    }
    
    return `${baseClass} bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400`;
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
      {options.map((option) => (
        <button
          key={option.field}
          onClick={() => handleSortClick(option.field)}
          disabled={disabled}
          className={getButtonClass(option.field)}
          title={`Sort by ${option.label.toLowerCase()} ${currentSort.field === option.field && currentSort.order === 'asc' ? '(ascending)' : currentSort.field === option.field && currentSort.order === 'desc' ? '(descending)' : ''}`}
        >
          {getSortIcon(option.field)}
          <span className="ml-2">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sorting;
