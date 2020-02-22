import React from 'react';
import { useTranslation } from 'react-i18next';

const Flag = () => {
  const { i18n } = useTranslation();

  const flagSvg = require(`./${i18n.language}.svg`);

  return <img style={{ maxWidth: '50%' }} src={flagSvg} alt="flag" />;
};

export default Flag;
