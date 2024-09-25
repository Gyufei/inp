'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithDefaultOnErrorProps extends Omit<React.ComponentProps<typeof Image>, 'onError' | 'src'> {
  defaultImg?: string;
  src: string;
}

export const ImageWithDefaultOnError = ({ defaultImg, ...rest }: ImageWithDefaultOnErrorProps) => {
  const [defaultImage, setDefaultImage] = useState(false);

  return !defaultImage ? (
    <Image
      {...rest}
      alt={rest.alt}
      onError={() => {
        setDefaultImage(true);
      }}
    />
  ) : (
    <Image {...rest} src={defaultImg || '/images/server-placeholder.png'} alt="default image" />
  );
};
