import { Routes, Route } from 'react-router';

import AdminDashboard from './pages/AdminDashboard.tsx';
import { ProtectedRoute } from './routes/ProtectedRoutes.tsx';
import Auth from './pages/Auth.tsx';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoute allow={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;