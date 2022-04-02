import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appbar from '../components/Appbar';

const FeaturesHome = lazy(() => import('@uihub/features/home'));
const FeaturesGraphql = lazy(() => import('@uihub/features/graphql'));

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Appbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<FeaturesHome />} />
          <Route path="/graphql" element={<FeaturesGraphql />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
