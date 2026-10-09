import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

async function criarUsuario(dados) {
  const response = await api.post('/usuarios', dados);
  return response.data;
}

async function buscarUsuario(id) {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
}

async function atualizarUsuario(id, dados) {
  const response = await api.put(`/usuarios/${id}`, dados);
  return response.data;
}

function mensagemDeErro(error) {
  const resposta = error.response?.data;
  if (!resposta?.mensagem) {
    return ['Não foi possível salvar o usuário. Tente novamente.'];
  }
  return [resposta.mensagem, ...(resposta.erros ?? [])];
}

const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' };
const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const campoStyle = { marginBottom: '1rem' };

export default function AdminUsuarioFormPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['usuario', id],
    queryFn: () => buscarUsuario(id),
    enabled: !!id,
  });

  if (id && isLoading) {
    return <p style={{ color: '#555' }}>Carregando usuário...</p>;
  }

  if (id && isError) {
    return <p style={{ color: '#e74c3c' }}>Erro ao carregar usuário.</p>;
  }

  return <UsuarioForm key={id ?? 'novo'} id={id} usuario={data} />;
}

function UsuarioForm({ id, usuario }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState(usuario?.nome ?? '');
  const [email, setEmail] = useState(usuario?.email ?? '');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState(usuario?.role ?? 'gestor');
  const queryClient = useQueryClient();
  const isEdicao = !!id;

  const salvarMutation = useMutation({
    mutationFn: () => {
      if (!isEdicao) {
        return criarUsuario({ nome, email, senha, role });
      }
      const dados = { nome, email, role };
      if (senha) {
        dados.senha = senha;
      }
      return atualizarUsuario(id, dados);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      if (isEdicao) {
        queryClient.invalidateQueries({ queryKey: ['usuario', id] });
      }
      navigate('/admin/usuarios');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    salvarMutation.mutate();
  };

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>{isEdicao ? 'Editar usuário' : 'Novo usuário'}</h2>

      {salvarMutation.isError && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fdecea', color: '#c0392b', borderRadius: '4px', fontSize: '0.9rem' }}>
          {mensagemDeErro(salvarMutation.error).map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
      )}

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
            required={!isEdicao}
            placeholder={isEdicao ? 'Deixe em branco para manter a atual' : 'Digite uma senha'}
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
            disabled={salvarMutation.isPending}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: salvarMutation.isPending ? '#a0c4ff' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: salvarMutation.isPending ? 'not-allowed' : 'pointer'
            }}
          >
            {salvarMutation.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
