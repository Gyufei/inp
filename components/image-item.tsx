import React, { useState } from 'react';
import PreviewImage from './preview-image';
import Image from 'next/image';
interface ImageItemProps {
  image: string;
  onDelete: (image: string) => void;
  style?: React.CSSProperties;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onDelete, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <div
        style={{
          width: style.width ? style.width : '140px',
          height: style.height ? style.height : '140px',
          position: 'relative',
          border: `1px solid ${isHovered ? '#007bff' : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFullScreen(true)}
      >
        <Image
          src={image}
          alt="Uploaded"
          layout="fill"
        />
        
        {isHovered && (
          <button
            onClick={(event) => {
              event.stopPropagation()
              onDelete(image)
            }}
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
      {isFullScreen && (
          <PreviewImage
            imageUrl={image}
            onClose={() => setIsFullScreen(false)}
          />
        )}
      </>
  );
};

export default ImageItem;