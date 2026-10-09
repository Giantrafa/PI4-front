import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

async function buscarUsuarios() {
  const response = await api.get('/usuarios');
  return response.data;
}

const thStyle = { textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid #ddd', color: '#555', fontSize: '0.9rem' };
const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #eee', color: '#333' };

export default function GestorFiscalizadoresPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['usuarios'],
    queryFn: buscarUsuarios,
  });

  const fiscalizadores = (data ?? []).filter((u) => u.role === 'fiscalizador');

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>Fiscalizadores</h2>

      {isLoading && <p style={{ color: '#555' }}>Carregando fiscalizadores...</p>}

      {isError && <p style={{ color: '#e74c3c' }}>Erro ao carregar fiscalizadores.</p>}

      {!isLoading && !isError && fiscalizadores.length === 0 && (
        <p style={{ color: '#555' }}>Nenhum fiscalizador cadastrado.</p>
      )}

      {!isLoading && !isError && fiscalizadores.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {fiscalizadores.map((fiscalizador) => (
              <tr key={fiscalizador.id}>
                <td style={tdStyle}>{fiscalizador.nome}</td>
                <td style={tdStyle}>{fiscalizador.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
