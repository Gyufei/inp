import React, { useState } from 'react';
import PreviewImage from './preview-image';
import Image from 'next/image';
import { ImageWithDefaultOnError } from './image-with-onError';
interface ImageItemProps {
  image: string;
  onDelete: (image: string) => void;
  style?: React.CSSProperties;
  hideDel?: boolean;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onDelete, style = {}, hideDel = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer"
        style={{
          width: style.width ? style.width : '140px',
          height: style.height ? style.height : '140px',
          border: `1px solid ${isHovered ? '#007bff' : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: '8px',
          transition: 'border-color 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFullScreen(true)}
      >
        <ImageWithDefaultOnError className="rounded-lg" src={image} alt="Uploaded" fill sizes="140px" />

        {!hideDel && isHovered && (
          <Image
            className="absolute -top-2 -right-2 cursor-pointer size-5"
            src="/icons/close.svg"
            alt="Uploaded"
            width={20}
            height={20}
            onClick={(e) => {
              onDelete(image);
              e.stopPropagation();
            }}
          />
        )}
      </div>
      {isFullScreen && <PreviewImage imageUrl={image} onClose={() => setIsFullScreen(false)} />}
    </>
  );
};

export default ImageItem;
