import { Container } from '@mui/material';
import { FeaturesGraphql } from '@uihub/features/graphql';
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
          <Route path="/graphql" element={<FeaturesGraphql />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
