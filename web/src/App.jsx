import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/AppLayout';
import AdminUsuariosPage from './pages/AdminUsuariosPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<div style={{ fontSize: '1.2rem', color: '#333' }}>Bem-vindo ao Sistema Procon! Escolha uma opção no menu.</div>} />
            <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}