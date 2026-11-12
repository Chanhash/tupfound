import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;