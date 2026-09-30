import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

async function fazerLogin(email, senha) {
  const response = await api.post('/auth/login', { email, senha });
  return response.data;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => fazerLogin(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/', { replace: true });
    },
    onError: (error) => {
      console.error(error);
      alert('E-mail ou senha inválidos');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    loginMutation.mutate(); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f8' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>Procon - Login</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Digite seu e-mail"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Digite sua senha"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            type="submit" 
            disabled={loginMutation.isPending}
            style={{ 
              width: '50%', 
              padding: '0.75rem', 
              backgroundColor: loginMutation.isPending ? '#a0c4ff' : '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 'bold', 
              cursor: loginMutation.isPending ? 'not-allowed' : 'pointer' 
            }}
          >
            {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}