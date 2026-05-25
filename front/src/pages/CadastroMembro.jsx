import { useState } from 'react';

export default function CadastroMembro() {
  const [membro, setMembro] = useState({ nome: '', identificador: '' });

  const handleChange = (e) => {
    setMembro({ ...membro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membro),
      });
      const data = await response.json();
      alert(data.mensagem);
      setMembro({ nome: '', identificador: '' });
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Membro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input name="nome" placeholder="Nome Completo" value={membro.nome} onChange={handleChange} required />
        <input name="identificador" placeholder="Identificador (Ex: RA, CPF)" value={membro.identificador} onChange={handleChange} required />
        <button type="submit">Salvar Membro</button>
      </form>
    </div>
  );
}