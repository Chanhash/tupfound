import { Routes, Route } from 'react-router';

import { HomeRedirect, ProtectedRoute } from './routes/ProtectedRoutes.tsx';
import Auth from './pages/Auth.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Home from './pages/Home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoute allow={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allow={["user"]} />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}

export default App;
