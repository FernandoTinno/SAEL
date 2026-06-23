import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

export default function Acervo() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('asc');

  useEffect(() => {
    const buscarLivros = async () => {
      try {
        const params = new URLSearchParams();
        if (busca.trim()) params.append('busca', busca.trim());
        if (ordem) params.append('ordem', ordem);

        const response = await fetch(`http://localhost:8000/livros?${params.toString()}`);
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    buscarLivros();
  }, [busca, ordem]);

  const handleOrdem = (event, novaOrdem) => {
    if (novaOrdem !== null) {
      setOrdem(novaOrdem);
    }
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 800 }}>
      <div>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Acervo
        </Typography>
        <Typography color="text.secondary">
          Pesquise um livro por título ou autor e ordene o acervo por título.
        </Typography>
      </div>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar por título ou autor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <ToggleButtonGroup
          value={ordem}
          exclusive
          onChange={handleOrdem}
          aria-label="ordenar por título"
        >
          <ToggleButton value="asc" aria-label="A a Z">
            <ArrowUpwardRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> A–Z
          </ToggleButton>
          <ToggleButton value="desc" aria-label="Z a A">
            <ArrowDownwardRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Z–A
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Card variant="outlined">
        <List>
          {livros.length === 0 ? (
            <ListItem>
              <ListItemText primary="Nenhum livro encontrado." />
            </ListItem>
          ) : (
            livros.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={item.titulo}
                    secondary={`Autor: ${item.autor} | Ano: ${item.ano} | Disponíveis: ${item.disponiveis} de ${item.quantidade}`}
                  />
                </ListItem>
                {index < livros.length - 1 && <Divider />}
              </div>
            ))
          )}
        </List>
      </Card>
    </Stack>
  );
}
