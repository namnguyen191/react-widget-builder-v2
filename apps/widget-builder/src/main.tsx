import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorkerRegistration from './service-worker/serviceWorkerRegistration';

const appContainer = document.getElementById('root');

if (appContainer) {
  const root = createRoot(appContainer);

  root.render(
    <StrictMode>
      <BrowserRouter basename="/react-widget-builder-v2">
        <CssBaseline>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error('Cannot find element with id "root"');
}

serviceWorkerRegistration.register();
