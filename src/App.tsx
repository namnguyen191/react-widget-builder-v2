import { ThemeProvider } from '@emotion/react';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import { createTheme, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import Page from './shared/components/Page';

const FeaturesGraphql = lazy(
  () => import('./features/grapql-editor/GraphQLEditor')
);
const FeaturesStjsEditor = lazy(
  () => import('./features/transformation-editor/TransformationEditor')
);
const FeaturesTransformationEditor = lazy(() =>
  import('./features/transformation-editor-v2/TransformationEditorV2').then(
    (module) => ({ default: module.TransformationEditorV2 })
  )
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
          <MenuItem
            component={Link}
            to={'/graphql'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography>GraphQL Editor</Typography>
          </MenuItem>
          <MenuItem
            component={Link}
            to={'/transformation'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography>Transformation Editor (New)</Typography>
          </MenuItem>
          <MenuItem
            component={Link}
            to={'/stjs-editor'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography>Transformation Editor (Old)</Typography>
          </MenuItem>
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
          <Route
            path="/"
            element={
              <Page title="Widget Builder">
                <Home />
              </Page>
            }
          />
          <Route
            path="/graphql"
            element={
              <Page title="GraphQL Editor">
                <FeaturesGraphql />
              </Page>
            }
          />
          <Route
            path="/stjs-editor"
            element={
              <Page title="Transformation Editor (Old)">
                <FeaturesStjsEditor />
              </Page>
            }
          />
          <Route
            path="/transformation"
            element={
              <Page title="Transformation Editor (New)">
                <FeaturesTransformationEditor />
              </Page>
            }
          />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};
export default App;
