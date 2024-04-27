import { useEffect } from 'react';

type UseOpenCloseFormProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement>;
};

export const useOpenCloseForm = ({ isOpen, setIsOpen, rootRef }: UseOpenCloseFormProps) => {
  function handleArrowBtnClick() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, setIsOpen, rootRef]);

  return handleArrowBtnClick;
};
