import { useEffect, useCallback } from 'react';

type UseOpenCloseFormProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement>;
};

export const useOpenCloseForm = ({ isOpen, setIsOpen, rootRef }: UseOpenCloseFormProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const { target } = event;
      if (rootRef.current && !rootRef.current.contains(target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, rootRef, setIsOpen]);

  return useCallback(() => {}, []); // Возвращаем пустую функцию
};
