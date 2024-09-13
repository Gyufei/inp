import React, { useState } from 'react';

interface ImageItemProps {
  image: string;
  onDelete: (id: string) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: '140px',
        height: '140px',
        position: 'relative',
        border: `2px solid ${isHovered ? '#007bff' : 'transparent'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image.url}
        alt="Uploaded"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {isHovered && (
        <button
          onClick={() => onDelete(image.id)}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageItem;