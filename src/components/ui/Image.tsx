'use client';

import NextImage from 'next/image';
import { ComponentProps, useCallback } from 'react';

type NextImageProps = ComponentProps<typeof NextImage>;

interface ImageProps extends Omit<NextImageProps, 'src' | 'onError'> {
  src?: string;
}

const Image = ({ src, alt, ...props }: ImageProps) => {
  const onError = useCallback<NonNullable<NextImageProps['onError']>>(e => {
    e.currentTarget.src = '/placeholder.svg';
  }, []);

  return <NextImage src={src ?? '/placeholder.svg'} alt={src ? alt : 'Placeholder'} {...props} onError={undefined} />;
};

export default Image;
