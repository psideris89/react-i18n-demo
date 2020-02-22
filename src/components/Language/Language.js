import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { i18n } = useTranslation();
  const [dropdownLang, setDropdownLang] = useState(i18n.language || 'en');

  const languageHandler = event => {
    const newLanguage = event.target.value;
    if (dropdownLang !== newLanguage) {
      setDropdownLang(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <FormControl style={{ minWidth: 120 }}>
      <Select value={dropdownLang} onChange={languageHandler}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="el">Ελληνικά</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="it">Italiano</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Language;
