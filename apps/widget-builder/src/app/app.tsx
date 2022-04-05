import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appbar from '../components/Appbar';

const FeaturesHome = lazy(() => import('@uihub/features/home'));
const FeaturesGraphql = lazy(() => import('@uihub/features/graphql'));
const FeaturesStjsEditor = lazy(() => import('@uihub/features/stjs-editor'));

const App: React.FC = () => {
  const darkTheme = createTheme({
    // Theme settings
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Appbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<FeaturesHome />} />
          <Route path="/graphql" element={<FeaturesGraphql />} />
          <Route path="/stjs-editor" element={<FeaturesStjsEditor />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
