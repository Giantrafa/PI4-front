import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' };
const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit' };
const campoStyle = { marginBottom: '1rem' };

export default function GestorNovaVisitaPage() {
  const navigate = useNavigate();
  const [denunciado, setDenunciado] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>Nova visita</h2>

      <form onSubmit={handleSubmit}>
        <div style={campoStyle}>
          <label style={labelStyle}>Dados do denunciado</label>
          <input
            type="text"
            value={denunciado}
            onChange={(e) => setDenunciado(e.target.value)}
            placeholder="Nome ou razão social do denunciado"
            style={inputStyle}
          />
        </div>

        <div style={campoStyle}>
          <label style={labelStyle}>Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Rua, número, bairro, cidade"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Descrição da denúncia</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={5}
            placeholder="Descreva a denúncia"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ padding: '0.6rem 1rem', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{ padding: '0.6rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Criar visita
          </button>
        </div>
      </form>
    </div>
  );
}
