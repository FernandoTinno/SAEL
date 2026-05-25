import { useState } from 'react';

export default function CadastroLivro() {
  const [livro, setLivro] = useState({ titulo: '', autor: '', ano: '', quantidade: '' });

  const handleChange = (e) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...livro,
          ano: parseInt(livro.ano),
          quantidade: parseInt(livro.quantidade)
        }),
      });
      const data = await response.json();
      alert(data.mensagem);
      setLivro({ titulo: '', autor: '', ano: '', quantidade: '' }); // Limpa o form
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Livro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input name="titulo" placeholder="Título" value={livro.titulo} onChange={handleChange} required />
        <input name="autor" placeholder="Autor" value={livro.autor} onChange={handleChange} required />
        <input name="ano" type="number" placeholder="Ano de Publicação" value={livro.ano} onChange={handleChange} required />
        <input name="quantidade" type="number" placeholder="Quantidade" value={livro.quantidade} onChange={handleChange} required />
        <button type="submit">Salvar Livro</button>
      </form>
    </div>
  );
}