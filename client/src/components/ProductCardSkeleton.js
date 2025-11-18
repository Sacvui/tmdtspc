import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f1f5f9'
      }}
    >
      {/* Image skeleton */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      />
      
      {/* Content skeleton */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Title skeleton */}
        <div
          style={{
            height: '20px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '4px',
            width: '80%'
          }}
        />
        
        {/* Rating skeleton */}
        <div
          style={{
            height: '16px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '4px',
            width: '60%'
          }}
        />
        
        {/* Price skeleton */}
        <div
          style={{
            height: '24px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '4px',
            width: '50%',
            marginTop: 'auto'
          }}
        />
        
        {/* Button skeleton */}
        <div
          style={{
            height: '44px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '12px',
            marginTop: '12px'
          }}
        />
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCardSkeleton;

