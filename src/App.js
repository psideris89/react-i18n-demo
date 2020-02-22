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
