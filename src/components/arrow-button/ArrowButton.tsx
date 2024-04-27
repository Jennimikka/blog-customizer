import arrow from 'src/images/arrow.svg';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
type ArrowButtonProps = {
  onClick: OnClick;
  isContainerOpen: boolean;
};

export const ArrowButton = ({ onClick, isContainerOpen }: ArrowButtonProps) => {
  const [isOpen, setIsOpen] = useState(isContainerOpen);
  const styleArrow = clsx({
    [styles.arrow]: true,
    [styles.arrow_open]: isOpen
  });
  const stylesContainer = clsx({
    [styles.container]: true,
    [styles.container_open]: isOpen
  });

  useEffect(() => {
    setIsOpen(isContainerOpen);
  }, [isContainerOpen]);
  return (
    /* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
    <div
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      tabIndex={0}
      className={stylesContainer}
      onClick={onClick}
    >
      <img src={arrow} alt="иконка стрелочки" className={styleArrow} />
    </div>
  );
};
