import { FeaturesGraphql } from '@uihub/features/graphql';
import { FeaturesHome } from '@uihub/features/home';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appbar from '../components/Appbar';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Appbar />
      <Routes>
        <Route path="/" element={<FeaturesHome />} />
        <Route path="/graphql" element={<FeaturesGraphql />} />
      </Routes>
    </>
  );
};

export default App;
