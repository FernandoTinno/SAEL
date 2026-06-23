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

const initialMembro = { nome: '', identificador: '' };

export default function CadastroMembro() {
  const [membro, setMembro] = useState(initialMembro);
  const [feedback, setFeedback] = useState(null);
  const [listaMembros, setListaMembros] = useState([]);

  const fetchMembros = async () => {
    try {
      const response = await fetch('http://localhost:8000/membros');
      const data = await response.json();
      setListaMembros(data);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    }
  };

  useEffect(() => {
    fetchMembros();
  }, []);

  const handleChange = (event) => {
    setMembro({ ...membro, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);

    try {
      const response = await fetch('http://localhost:8000/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membro),
      });
      const data = await response.json();
      setFeedback({ severity: 'success', message: data.mensagem || 'Membro cadastrado com sucesso.' });
      setMembro(initialMembro);
      fetchMembros();
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
            Cadastrar Membro
          </Typography>
          <Typography color="text.secondary">
            Registre novos usuários para utilizarem a biblioteca.
          </Typography>
        </div>

        <Card variant="outlined">
          <CardContent>
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
              <TextField name="nome" placeholder="Nome Completo" value={membro.nome} onChange={handleChange} required fullWidth />
              <TextField
                name="identificador"
                placeholder="Identificador (CPF)"
                value={membro.identificador}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                Salvar Membro
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Membros Registrados
        </Typography>
        <Card variant="outlined">
          <List>
            {listaMembros.length === 0 ? (
              <ListItem>
                <ListItemText primary="Nenhum membro cadastrado ainda." />
              </ListItem>
            ) : (
              listaMembros.map((item, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={item.nome}
                      secondary={`Identificador: ${item.identificador} | Livros em mãos: ${item.livros_emprestados.length}`}
                    />
                  </ListItem>
                  {index < listaMembros.length - 1 && <Divider />}
                </div>
              ))
            )}
          </List>
        </Card>
      </Stack>
    </Stack>
  );
}