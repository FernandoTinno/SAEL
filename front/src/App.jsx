import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import CadastroLivro from './pages/CadastroLivro';
import CadastroMembro from './pages/CadastroMembro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/cadastro-livro"
          element={
            <Dashboard>
              <CadastroLivro />
            </Dashboard>
          }
        />
        <Route
          path="/cadastro-membro"
          element={
            <Dashboard>
              <CadastroMembro />
            </Dashboard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
