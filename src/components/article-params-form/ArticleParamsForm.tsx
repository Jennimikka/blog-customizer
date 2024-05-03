import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, FormEvent } from 'react';
import {
  ArticleStateType,
  defaultArticleState,
  OptionType,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
  params: ArticleStateType;
  setParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ params, setParams }: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(params);
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

  function handleSubmitChanges(value: OptionType) {
    const updatedState = {
      fontFamilyOption: fontFamilyOptions.includes(value) ? value : state.fontFamilyOption,
      fontColor: fontColors.includes(value) ? value : state.fontColor,
      backgroundColor: backgroundColors.includes(value) ? value : state.backgroundColor,
      contentWidth: contentWidthArr.includes(value) ? value : state.contentWidth,
      fontSizeOption: fontSizeOptions.includes(value) ? value : state.fontSizeOption
    };
    setState(updatedState);
  }

  const submitSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParams(state);
  };

  const resetSettings = () => {
    setState(defaultArticleState);
    setParams(defaultArticleState);
  };

  return (
    <div ref={rootRef} className={styles.wrapper}>
      <ArrowButton onClick={handleArrowBtnClick} isOpen={isOpen} />
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={submitSettings} onReset={resetSettings}>
          <Text size={31} weight={800} uppercase={true}>
            {'Задайте параметры'}
          </Text>
          <Select
            selected={state.fontFamilyOption}
            options={fontFamilyOptions}
            title={'Шрифт'}
            onChange={handleSubmitChanges}
          />
          <RadioGroup
            name={'fontSize'}
            selected={state.fontSizeOption}
            options={fontSizeOptions}
            title={'Размер шрифта'}
            onChange={handleSubmitChanges}
          />
          <Select
            selected={state.fontColor}
            options={fontColors}
            title={'Цвет шрифта'}
            onChange={handleSubmitChanges}
          />
          <Separator />
          <Select
            selected={state.backgroundColor}
            options={backgroundColors}
            title={'Цвет фона'}
            onChange={handleSubmitChanges}
          />
          <Select
            selected={state.contentWidth}
            options={contentWidthArr}
            title={'Ширина контента'}
            onChange={handleSubmitChanges}
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
