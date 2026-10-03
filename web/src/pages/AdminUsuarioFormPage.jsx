import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' };
const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const campoStyle = { marginBottom: '1rem' };

export default function AdminUsuarioFormPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('gestor');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envio para POST /usuarios será feito na próxima tarefa
  };

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>Novo usuário</h2>

      <form onSubmit={handleSubmit}>
        <div style={campoStyle}>
          <label style={labelStyle}>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome completo"
            style={inputStyle}
          />
        </div>

        <div style={campoStyle}>
          <label style={labelStyle}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@exemplo.com"
            style={inputStyle}
          />
        </div>

        <div style={campoStyle}>
          <label style={labelStyle}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="Digite uma senha"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Perfil</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
            <option value="gestor">Gestor</option>
            <option value="fiscalizador">Fiscalizador</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/usuarios')}
            style={{ padding: '0.6rem 1rem', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{ padding: '0.6rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
