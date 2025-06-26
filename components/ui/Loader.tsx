import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-odc-orange"></div>
    <span className="ml-3 text-odc-orange">Loading...</span>
  </div>
); 