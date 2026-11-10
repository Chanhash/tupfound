import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;