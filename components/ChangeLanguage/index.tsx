import i18n from '@/i18n';
import Image from 'next/image';
import { FC, useState } from 'react';
import style from './style.module.css';

const folder = '/Assets/images/';

const ChangeLanguage: FC = () => {
  const options = [
    {
      id: 1,
      icon: folder + 'iconEn.svg',
      translate: 'en',
    },
    {
      id: 2,
      icon: folder + 'iconEs.svg',
      translate: 'es',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[1].icon);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: number) => () => {
    const { icon }: any = options.find((v) => v.id == value);
    setSelectedOption(icon);
    setIsOpen(false);
  };
  return (
    <div className={style.container}>
      <div onClick={toggling} className={style.containerSelectLanguage}>
        <Image
          src={selectedOption}
          alt="FNT"
          width={10}
          height={10}
          className={style.languageSelect}
        />
        <Image
          src={folder + 'iconArrowSelect.svg'}
          alt="FNT"
          width={15}
          height={15}
          className={isOpen ? style.iconArrow : style.iconArrowClose}
        />
      </div>
      {isOpen && (
        <div className={style.contentDropDown}>
          {options.map((option) => (
            <div
              onClick={onOptionClicked(option.id)}
              key={Math.random()}
              className={style.contentDropDownLanguage}>
              <button
                onClick={() => {
                  handleLanguageChange(option.translate);
                }}
                className={style.contentSelectionLanguage}>
                <Image
                  src={option.icon}
                  alt="FNT"
                  width={20}
                  height={20}
                  key={option.id}
                  className={style.languageSelect}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeLanguage;
