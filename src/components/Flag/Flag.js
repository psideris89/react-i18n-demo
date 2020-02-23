import React from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from './en.svg';
import elFlag from './el.svg';
import esFlag from './es.svg';
import itFlag from './it.svg';

const Flag = () => {
  const { i18n } = useTranslation();

  const detectSvg = () => {
    const language = i18n.language;
    let image;
    switch (language) {
      case 'en':
        image = enFlag;
        break;
      case 'el':
        image = elFlag;
        break;
      case 'es':
        image = esFlag;
        break;
      case 'it':
        image = itFlag;
        break;
      default:
        image = enFlag;
    }

    return image;
  };

  return <img style={{ maxWidth: '50%' }} src={detectSvg()} alt="flag" />;
};

export default Flag;
