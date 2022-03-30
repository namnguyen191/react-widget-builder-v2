import { FeaturesHome } from '@uihub/features/home';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FeaturesHome />} />
    </Routes>
  );
};

export default App;
