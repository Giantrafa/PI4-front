import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// componentes temporários apenas para ver se tá funcionando!!
const LoginPlaceholder = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Login</h2>
  </div>
);

const AdminDashboardPlaceholder = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Painel Admin</h2>
  </div>
);

const GestorPlaceholder = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Painel Gestor</h2>
  </div>
);

const NotFoundPlaceholder = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>404 - Página Não Encontrada</h2>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPlaceholder />} />
        <Route path="/admin" element={<AdminDashboardPlaceholder />} />
        <Route path="/gestor/fiscalizadores" element={<GestorPlaceholder />} />
        <Route path="*" element={<NotFoundPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}