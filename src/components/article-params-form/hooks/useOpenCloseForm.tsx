import { useEffect } from 'react';

type UseOpenCloseFormProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	saveRef: React.RefObject<HTMLDivElement>;
};

export const useOpenCloseForm = ({
	isOpen,
	setIsOpen,
	saveRef,
}: UseOpenCloseFormProps) => {
	function handleArrowButtonClick() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			const { target } = event;
			if (target instanceof Node && !saveRef.current?.contains(target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, setIsOpen, saveRef]);

	return handleArrowButtonClick;
};