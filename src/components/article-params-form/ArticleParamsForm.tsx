import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  ArticleStateType,
  defaultArticleState,
  OptionType,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  UseOpenCloseFormProps
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import clsx from 'clsx';

type ArticleParamsFormProps = {
  params: ArticleStateType;
  setParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ params, setParams }: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(params);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const useOpenCloseForm = ({ isOpen, setIsOpen, rootRef }: UseOpenCloseFormProps) => {
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

  const handleArrowBtnClick = useOpenCloseForm({ isOpen, setIsOpen, rootRef });

  function handleSubmitChanges(value: OptionType) {
    if (fontFamilyOptions.includes(value)) {
      setState({ ...state, fontFamilyOption: value });
    }
    if (fontColors.includes(value)) {
      setState({ ...state, fontColor: value });
    }
    if (backgroundColors.includes(value)) {
      setState({ ...state, backgroundColor: value });
    }
    if (contentWidthArr.includes(value)) {
      setState({ ...state, contentWidth: value });
    }
    if (fontSizeOptions.includes(value)) {
      setState({ ...state, fontSizeOption: value });
    }
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
    <div ref={rootRef}>
      <ArrowButton onClick={handleArrowBtnClick} isContainerOpen={isOpen} />
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
