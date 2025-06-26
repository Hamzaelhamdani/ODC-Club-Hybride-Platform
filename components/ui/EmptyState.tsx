import React from 'react';

export const EmptyState: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 12h8M8 16h8M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    <p className="mt-4">{message || 'No data available.'}</p>
  </div>
); 