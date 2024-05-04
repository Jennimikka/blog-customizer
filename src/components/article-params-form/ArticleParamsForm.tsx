import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, FormEvent } from 'react';
import {
  ArticleStateType,
  defaultArticleState,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  OptionType
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
  params: ArticleStateType;
  setParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ params, setParams }: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  function handleArrowBtnClick() {
    setIsOpen(prevState => !prevState);
  }
  useOutsideClickClose({
    isOpen,
    rootRef,
    onClose: handleArrowBtnClick,
    onChange: setIsOpen
  });

  const [formState, setFormState] = useState(params);

  const handleOnChange = (key: keyof ArticleStateType) => {
    return (value: OptionType) => {
      setFormState(prevState => ({ ...prevState, [key]: value }));
    };
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParams(formState);
  };

  const handleResetForm = () => {
    setFormState(defaultArticleState);
    setParams(defaultArticleState);
  };

  return (
    <div ref={rootRef} className={styles.wrapper}>
      <ArrowButton onClick={handleArrowBtnClick} isOpen={isOpen} />
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={handleSubmitForm} onReset={handleResetForm}>
          <h2 className={styles.title}>Задайте параметры</h2>
          <Select
            title={'шрифт'}
            onChange={handleOnChange('fontFamilyOption')}
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
          />
          <RadioGroup
            name={'fontSize'}
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            title={'Размер шрифта'}
            onChange={handleOnChange('fontSizeOption')}
          />
          <Select
            selected={formState.fontColor}
            options={fontColors}
            title={'Цвет шрифта'}
            onChange={handleOnChange('fontColor')}
          />
          <Separator />
          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            title={'Цвет фона'}
            onChange={handleOnChange('backgroundColor')}
          />
          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            title={'Ширина контента'}
            onChange={handleOnChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </div>
  );
};
