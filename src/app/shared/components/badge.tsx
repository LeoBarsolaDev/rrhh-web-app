import React from 'react';

interface BadgeProps {
  value: string | null | undefined;
  mapping: Record<string, string>;
  fallback?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  value, 
  mapping, 
  fallback = 'bg-gray-100 text-gray-600', 
  className = '' 
}) => {
  // Obtenemos la clase del mapeo o usamos el fallback si el valor no existe
  const colorClass = (value && mapping[value]) ? mapping[value] : fallback;

  return (
    <span className={`px-2 py-0.5 rounded-lg text-sm font-bold border ${colorClass} ${className}`}>
      {value || 'Sin especificar'}
    </span>
  );
};

export default Badge;