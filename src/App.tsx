import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingPage } from './pages/OnboardingPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/onboard" element={<OnboardingPage />} />
    </Routes>
  );
}

export default App;
