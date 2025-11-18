import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#1a5ca2';
      default:
        return '#10b981';
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        .toast-enter {
          animation: slideInRight 0.3s ease forwards;
        }
        .toast-exit {
          animation: slideOutRight 0.3s ease forwards;
        }
      `}</style>
      <div
        className="toast-enter"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: getBackgroundColor(),
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 10000,
          fontWeight: 600,
          fontSize: '15px',
          maxWidth: '400px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}
        onClick={onClose}
        role="alert"
        aria-live="polite"
      >
        <span style={{ fontSize: '20px' }}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>
        <span>{message}</span>
      </div>
    </>
  );
};

export default Toast;

