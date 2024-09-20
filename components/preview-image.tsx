import React from 'react';
import Image from 'next/image';

interface FullScreenImageProps {
  imageUrl: string;
  onClose: () => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center z-[1000] bg-[rgba(0,0,0,0.8)]" onClick={onClose}>
      <Image className="max-w-[90%] max-h-[90%] object-contain" src={imageUrl} alt="Full Screen" width={800} height={800} onClick={(e) => e.stopPropagation()} />

      <Image className="absolute top-8 right-8 cursor-pointer" src="/icons/close.svg" alt="preview" width={20} height={20} />
    </div>
  );
};

export default FullScreenImage;
