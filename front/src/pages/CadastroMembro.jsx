import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const initialMembro = { nome: '', identificador: '' };

export default function CadastroMembro() {
  const [membro, setMembro] = useState(initialMembro);
  const [feedback, setFeedback] = useState(null);

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
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setFeedback({ severity: 'error', message: 'Erro ao conectar com a API.' });
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 720 }}>
      <div>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Cadastrar membro
        </Typography>
        <Typography color="text.secondary">
          Registre usuarios que podem utilizar o acervo.
        </Typography>
      </div>

      <Card variant="outlined">
        <CardContent>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
            <TextField name="nome" label="Nome completo" value={membro.nome} onChange={handleChange} required fullWidth />
            <TextField
              name="identificador"
              label="Identificador"
              placeholder="Ex: RA, CPF"
              value={membro.identificador}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
              Salvar membro
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
