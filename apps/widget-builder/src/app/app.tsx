import { Container } from '@mui/material';
import { FeaturesHome } from '@uihub/features/home';
import { Route, Routes } from 'react-router-dom';
import Appbar from '../components/Appbar';

const App: React.FC = () => {
  return (
    <>
      <Appbar />
      <Container>
        <Routes>
          <Route path="/" element={<FeaturesHome />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
