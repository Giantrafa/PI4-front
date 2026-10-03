import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

const ROLES_LISTADOS = ['gestor', 'fiscalizador'];

const ROLE_LABEL = {
  gestor: 'Gestor',
  fiscalizador: 'Fiscalizador',
};

async function buscarUsuarios() {
  const response = await api.get('/usuarios');
  return response.data;
}

async function excluirUsuario(id) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}

const thStyle = { textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid #ddd', color: '#555', fontSize: '0.9rem' };
const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #eee', color: '#333' };

export default function AdminUsuariosPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['usuarios'],
    queryFn: buscarUsuarios,
  });

  const queryClient = useQueryClient();

  const excluirMutation = useMutation({
    mutationFn: excluirUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
    onError: (error) => {
      alert(error.response?.data?.mensagem ?? 'Não foi possível excluir o usuário.');
    },
  });

  const handleExcluir = (usuario) => {
    if (window.confirm(`Excluir o usuário ${usuario.nome}?`)) {
      excluirMutation.mutate(usuario.id);
    }
  };

  const usuarios = (data ?? []).filter((u) => ROLES_LISTADOS.includes(u.role));

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Usuários</h2>
        <button
          onClick={() => navigate('/admin/usuarios/novo')}
          style={{ padding: '0.6rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Novo usuário
        </button>
      </div>

      {isLoading && <p style={{ color: '#555' }}>Carregando usuários...</p>}

      {isError && <p style={{ color: '#e74c3c' }}>Erro ao carregar usuários.</p>}

      {!isLoading && !isError && usuarios.length === 0 && (
        <p style={{ color: '#555' }}>Nenhum gestor ou fiscalizador cadastrado.</p>
      )}

      {!isLoading && !isError && usuarios.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>E-mail</th>
              <th style={thStyle}>Perfil</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td style={tdStyle}>{usuario.nome}</td>
                <td style={tdStyle}>{usuario.email}</td>
                <td style={tdStyle}>{ROLE_LABEL[usuario.role]}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => navigate(`/admin/usuarios/${usuario.id}/editar`)}
                      style={{ padding: '0.4rem 0.75rem', backgroundColor: '#fff', color: '#007bff', border: '1px solid #007bff', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(usuario)}
                      disabled={excluirMutation.isPending}
                      style={{ padding: '0.4rem 0.75rem', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: excluirMutation.isPending ? 'not-allowed' : 'pointer' }}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
