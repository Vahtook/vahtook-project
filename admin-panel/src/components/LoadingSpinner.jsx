import React from 'react';

const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  const spinnerSizes = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-3">
        <div className={`${spinnerSizes[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary-600`}></div>
        <span className={`${textSizes[size]} text-gray-600 font-medium`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;