'use client';

import { Button, type ButtonProps } from '@/components/ui/Button';
import { IconArrowDown } from '@/components/ui/Icons';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface ScrollToBottomButtonProps extends ButtonProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export const ScrollToBottomButton = ({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ScrollToBottomButtonProps) => (
  <Button
    variant="outline"
    size="icon"
    className={cn(
      'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
      isAtBottom ? 'opacity-0' : 'opacity-100',
      className,
    )}
    onClick={() => scrollToBottom()}
    {...props}
  >
    <IconArrowDown />
    <span className="sr-only">Scroll to bottom</span>
  </Button>
);
