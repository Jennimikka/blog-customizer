import { useEffect, useCallback } from 'react';

type UseOpenCloseFormProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement>;
};

export const useOpenCloseForm = ({ isOpen, setIsOpen, rootRef }: UseOpenCloseFormProps) => {
  const handleArrowBtnClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      const { target } = event;
      if (rootRef.current && !rootRef.current.contains(target as Node)) {
        setIsOpen(false);
      }
    },
    [rootRef, setIsOpen]
  );

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      handleOutsideClick(event);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleOutsideClick]);

  return handleArrowBtnClick;
};
