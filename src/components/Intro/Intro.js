import React from 'react';
import { useTranslation } from 'react-i18next';

const Intro = () => {
  const { t } = useTranslation();
  
  return <h1>{t('intro.title')}</h1>;
};

export default Intro;
