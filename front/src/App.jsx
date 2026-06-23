import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import CadastroLivro from './pages/CadastroLivro';
import CadastroMembro from './pages/CadastroMembro';
import Emprestimo from './pages/Emprestimo';
import Devolucao from './pages/Devolucao';
import FilaEspera from './pages/FilaEspera';
import Historico from './pages/Historico';
import Acervo from './pages/Acervo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/acervo" element={<Dashboard><Acervo /></Dashboard>} />
        <Route path="/emprestimo" element={<Dashboard><Emprestimo /></Dashboard>} />
        <Route path="/devolucao" element={<Dashboard><Devolucao /></Dashboard>} />
        <Route path="/filaespera" element={<Dashboard><FilaEspera /></Dashboard>} />
        <Route path="/historico" element={<Dashboard><Historico /></Dashboard>} />
        <Route path="/cadastro-livro" element={<Dashboard><CadastroLivro /></Dashboard>} />
        <Route path="/cadastro-membro" element={<Dashboard><CadastroMembro /></Dashboard>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;