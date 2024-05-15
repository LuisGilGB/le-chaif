import { useCallback, useRef } from 'react';

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, []);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
  };
};

export default useScrollAnchor;
