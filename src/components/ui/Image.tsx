'use client';

import NextImage from 'next/image';
import { ComponentProps, useCallback } from 'react';

interface ImageProps extends Omit<ComponentProps<typeof NextImage>, 'src' | 'onError'> {
  src?: string;
}

const Image = ({ src, alt, ...props }: ImageProps) => {
  const onError = useCallback(e => {
    e.currentTarget.src = '/placeholder.svg';
  }, []);

  return <NextImage src={src ?? '/placeholder.svg'} alt={src ? alt : 'Placeholder'} {...props} onError={null} />;
};

export default Image;
