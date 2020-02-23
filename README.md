# Internationlisation in React applications

Internationlisation allows us to translate our website in multiple languages. There are only a few steps required in order to achieve that. In this demo we are going to use the local storage in order to persist the language (session storage would be an alternative).

These are the steps we are going to work on:

- Create React template project
- Initialise i18next with settings/language
- Use i18next to display messages/content based on the language
- Create json files that contain translation messages
- Modify dropdown to update the language in the website
- Add routing for multi page experience

Let's start by creating a react application with create-react-app and navigate to the project directory.

```
$ npx create-react-app react-i18n-demo
$ cd react-i18n-demo
```

Delete everything in the App.js and let's create a simple navigation which contains the language dropdown.

```javascript
import React from 'react';
import Language from './components/Language/Language';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <nav style={{ height: '80px', backgroundColor: 'rgb(253, 117, 19)' }}>
        <div style={{ float: 'right', marginTop: '30px', marginRight: '20px' }}>
          <Language />
        </div>
      </nav>
    </div>
  );
};

export default App;
```

The next step is to create the Language component with the help of material-ui select component. Notice that this file is created in <i>src/components/Language/</i> . Let's start by installing material-ui/core.

```
$ npm install --save @material-ui/core
```

Now let's move on to the Language component which is the dropdown for the language selection. The selection is persisted in the state through the useState hook and the languageHandler allows us to update our selection.

```javascript
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';

const Language = () => {
  const [dropdownLang, setDropdownLang] = useState('en');

  const languageHandler = event => {
    const newLanguage = event.target.value;
    if (dropdownLang !== newLanguage) {
      setDropdownLang(newLanguage);
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
```

We continue with the Intro and Flag components. The former is a simple component that renders a message and the latter displays a relevant image. For that we found some svg images and imported them in our project.

```javascript
import React from 'react';

const Intro = () => {
  return <h1>Welcome to React!</h1>;
};

export default Intro;
```

```javascript
import React from 'react';
import flagSvg from './en.svg';

const Flag = () => {
  return <img style={{ maxWidth: '50%' }} src={flagSvg} alt="flag" />;
};

export default Flag;
```

At this point our project template is completed and you will be able to update the language from the dropdown. However the message and the flag are not updated as they are hardcoded for now. The next step is to integrate with i18next in order to render the content dynamically.

# i18n integration

In order to integrate with i18next we are going to need the following libraries:

- i18next
- react-i18next
- i18next-xhr-backend
- i18next-browser-languagedetector

```
$ npm install --save i18next react-i18next i18next-xhr-backend i18next-browser-languagedetector
```

Initially we need to configure/initialise <b>i18next</b>. The <b>i18next-xhr-backend</b> is responsible for loading the properties from the translation files. The <b>i18next-browser-languagedetector</b> as the name implies detects the language. We will come back to this library later on, as there are some interesting features we are going to use. Finally <b>react-18next</b> will be used widely in our project as it allows to read and update the i18next language.

```javascript
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    preload: ['en'],
    load: 'languageOnly',
    fallbackLng: 'en',
    debug: true,
    lowerCaseLng: true,
    detection: {
      order: ['localStorage']
    }
  });

export default i18n;
```

We chose to initialise with English which is also the fallback language but you could specify another, as well as, pre-load multiple languages. As we want to use the local storage in order to save the language in our website, we also need to give priority to that during the detection. Bare in mind that you can add more than one detectors, even custom ones.

<u>Note</u>: When a new language is set in i18next the relevant properties will be loaded in the memory. You can view that in the console if you have the debug enabled.

At this point you will be able see the i18next initialisation in the console.

![i18next debug log](screenshots/i18next_console_log.png)

But where is the language persisted? In your browser's developer console navigate to the Application (Storage if using Firefox) tab and then select Local Storage. You will see that the property i18nextLng is added there (the name can be overwritten with i18next configuration).

![local storage](screenshots/local_storage.png)

# Render content dynamically based on i18next language

At this point we are going to modify the Language component to update the i18next language based on selection. Then we will remove the hardcoded values for the message (Input.js) and the image (Flag.js). Finally the last step will be to create json files to host the translated content.

Let's start with Language.js. In order to update the i18next language we can use the useTranslation hook from <b>react-i18next</b> library, which provides the i18n interface. In case that you are using classes instead of functional components the equivalent will be the withTranslation hoc.

```javascript
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { i18n } = useTranslation();
  const [dropdownLang, setDropdownLang] = useState('en');

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
```

At this point you will notice that the application throws an error. This is because i18next by default requires Suspense in order to work. The Suspense should be added one level higher than the component using it, so we are going to add it in App.js.

```javascript
import React, { Suspense } from 'react';
import Intro from './components/Intro/Intro';
import Flag from './components/Flag/Flag';
import Language from './components/Language/Language';
import './App.css';

const App = () => {
  return (
    <Suspense fallback={<p>Loading Translations ...</p>}>
      <div className="App">
        <nav style={{ height: '60px', backgroundColor: 'rgb(253, 117, 19)' }}>
          <div
            style={{ float: 'right', marginTop: '20px', marginRight: '20px' }}
          >
            <Language />
          </div>
        </nav>
        <div style={{ marginTop: '50px' }}>
          <Intro />
        </div>
        <div style={{ display: 'inline-block', width: '500px' }}>
          <Flag />
        </div>
      </div>
    </Suspense>
  );
};

export default App;
```

Now the application should be back up and running but how do you test that the language is actually updated? For that you can check the local storage of your browser!

Let's move on and remove the hardcoded content now. Similarly we are going to use the useTranslation hook and invoke the <b>t</b> function which allows you to use a property name instead of a direct value.

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

const Intro = () => {
  const { t } = useTranslation();

  return <h1>{t('intro.title')}</h1>;
};

export default Intro;
```

In the Flag component we use the i18n interface to detect the language and display the relevant svg.

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

const Flag = () => {
  const { i18n } = useTranslation();

  const flagSvg = require(`./${i18n.language}.svg`);

  return <img style={{ maxWidth: '50%' }} src={flagSvg} alt="flag" />;
};

export default Flag;
```

At this point the Flag rendering should be working however the message has changed to <i>intro.title</i>. This is an indication that the i18next failed to read the value of this property.

![property not rendering](screenshots/property_name.png)

To solve that we need to create the json files and add this property. By default i18next reads from <b>public/locales/{language}/</b> directories but you can overwrite that through 18next configuration.

This is my translation file for English language.

##### public/locales/en/translation.json

```javascript
{
  "intro": {
    "title": "Welcome to React!"
  }
}
```

Go ahead and create the other translation files!

At this point the application renders the proper messages and images but you might have noticed a bag. When you refresh the page even though the language might not be English the dropdown always displays that. To fix that just initialise the Language state based on the local storage.

```javascript
const [dropdownLang, setDropdownLang] = useState(i18n.language || 'en');
```

# Adding multi-page experience