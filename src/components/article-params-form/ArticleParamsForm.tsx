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

export const ArticleParamsForm = ({
	params,
	setParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement | null>(null);

	function handleArrowBtnClick() {
		setIsOpen((prevState) => !prevState);
	}
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: handleArrowBtnClick,
		onChange: setIsOpen,
	});

	const [fontFamilyOption, setFontFamilyOption] = useState(
		params.fontFamilyOption
	);

	const [fontSizeOption, setFontSizeOption] = useState(params.fontSizeOption);

	const [fontColor, setFontColor] = useState(params.fontColor);

	const [backgroundColor, setBackground] = useState(params.backgroundColor);

	const [contentWidth, setContentWidth] = useState(params.contentWidth);

	const handleSubmitSettings = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setParams({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	const handleResetSettings = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setParams(defaultArticleState);
	};

	return (
		<div ref={rootRef} className={styles.wrapper}>
			<ArrowButton onClick={handleArrowBtnClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitSettings}
					onReset={handleResetSettings}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFontFamilyOption}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={setFontSizeOption}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={setBackground}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
