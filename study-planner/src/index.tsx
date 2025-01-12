import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import global_eng from "./translations/eng/global.json";
import global_pol from "./translations/pol/global.json";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: {escapeValue: true},
  lng: "eng",
  resources: {
    eng: {
      global: global_eng
    },
    pol: {
      global: global_pol
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // I commented out the strict mode because it caused the components to mount twice and call the backend API twice, causing problems and errors
  //<React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  //</React.StrictMode>
);

