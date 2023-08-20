import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

const appContainer = document.getElementById('root');

if (!appContainer) {
  throw Error('Cannot find element with id "root"');
} else {
  console.log(`Base URL: `, import.meta.env.BASE_URL);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </React.StrictMode>
  );
}
