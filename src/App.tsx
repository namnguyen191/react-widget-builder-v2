import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const FeaturesGraphql = lazy(
  () => import('./features/grapql-editor/GraphQLEditor')
);
const FeaturesStjsEditor = lazy(
  () => import('./features/transformation-editor/TransformationEditor')
);

const Appbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to={'/'}
          >
            <ViewQuiltIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Widget Builder
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const App: React.FC = () => {
  const darkTheme = createTheme({
    // Theme settings
    palette: {
      mode: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Appbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphql" element={<FeaturesGraphql />} />
          <Route path="/stjs-editor" element={<FeaturesStjsEditor />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};
export default App;
