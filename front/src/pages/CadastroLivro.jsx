import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const initialLivro = { titulo: '', autor: '', ano: '', quantidade: '' };

export default function CadastroLivro() {
  const [livro, setLivro] = useState(initialLivro);
  const [feedback, setFeedback] = useState(null);
  const [listaLivros, setListaLivros] = useState([]);

  const fetchLivros = async () => {
    try {
      const response = await fetch('http://localhost:8000/livros');
      const data = await response.json();
      setListaLivros(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleChange = (event) => {
    setLivro({ ...livro, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);

    try {
      const response = await fetch('http://localhost:8000/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...livro,
          ano: parseInt(livro.ano, 10),
          quantidade: parseInt(livro.quantidade, 10),
        }),
      });
      const data = await response.json();
      setFeedback({ severity: 'success', message: data.mensagem || 'Livro cadastrado com sucesso.' });
      setLivro(initialLivro);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setFeedback({ severity: 'error', message: 'Erro ao conectar com a API.' });
    }
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 720 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Cadastrar livro
          </Typography>
          <Typography color="text.secondary">
            Adicione novos titulos ao acervo da biblioteca.
          </Typography>
        </div>

        <Card variant="outlined">
          <CardContent>
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
              <TextField name="titulo" label="Titulo" value={livro.titulo} onChange={handleChange} required fullWidth />
              <TextField name="autor" label="Autor" value={livro.autor} onChange={handleChange} required fullWidth />
              <TextField
                name="ano"
                label="Ano de publicacao"
                type="number"
                value={livro.ano}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="quantidade"
                label="Quantidade"
                type="number"
                value={livro.quantidade}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                Salvar livro
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Livros Cadastrados no Acervo
        </Typography>
        <Card variant="outlined">
          <List>
            {listaLivros.length === 0 ? (
              <ListItem>
                <ListItemText primary="Nenhum livro cadastrado ainda." />
              </ListItem>
            ) : (
              listaLivros.map((item, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={item.titulo}
                      secondary={`Autor: ${item.autor} | Ano: ${item.ano} | Disponíveis: ${item.disponiveis} de ${item.quantidade}`}
                    />
                  </ListItem>
                  {index < listaLivros.length - 1 && <Divider />}
                </div>
              ))
            )}
          </List>
        </Card>
      </Stack>
    </Stack>
  );
}