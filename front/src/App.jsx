import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroLivro from './pages/CadastroLivro';
import CadastroMembro from './pages/CadastroMembro';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <h1>Sistema de Biblioteca</h1>
          <nav style={{ display: 'flex', gap: '15px' }}>
            <Link to="/cadastro-livro">Cadastrar Livro</Link>
            <Link to="/cadastro-membro">Cadastrar Membro</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<h2>Bem-vindo! Escolha uma opção no menu.</h2>} />
            <Route path="/cadastro-livro" element={<CadastroLivro />} />
            <Route path="/cadastro-membro" element={<CadastroMembro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;