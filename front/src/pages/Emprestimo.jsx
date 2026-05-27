import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, List, ListItem, ListItemText,
  Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, RadioGroup, FormControlLabel, Radio, Alert
} from '@mui/material';

export default function Emprestimo() {
  const [livros, setLivros] = useState([]);
  const [membros, setMembros] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [identificador, setIdentificador] = useState('');
  const [step, setStep] = useState(1);
  const [bookToBorrow, setBookToBorrow] = useState('');
  const [feedback, setFeedback] = useState(null);

  const fetchData = async () => {
    try {
      const [resLivros, resMembros] = await Promise.all([
        fetch('http://localhost:8000/livros'),
        fetch('http://localhost:8000/membros')
      ]);
      const dataLivros = await resLivros.json();
      const dataMembros = await resMembros.json();
      setLivros(dataLivros);
      setMembros(dataMembros);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleToggleBook = (titulo) => {
    const currentIndex = selectedBooks.indexOf(titulo);
    const newSelected = [...selectedBooks];

    if (currentIndex === -1) {
      if (newSelected.length >= 2) return;
      newSelected.push(titulo);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    setSelectedBooks(newSelected);
  };

  const handleOpenModal = () => {
    if (selectedBooks.length === 0) {
      alert("Selecione ao menos um livro.");
      return;
    }
    setModalOpen(true);
    setStep(1);
    setIdentificador('');
    setFeedback(null);
  };

  const handleVerificar = () => {
    const membro = membros.find(m => m.identificador === identificador || m.nome === identificador);
    if (!membro) {
      setFeedback({ type: 'error', text: 'Membro não encontrado.' });
      return;
    }

    const currentCount = membro.livros_emprestados.length;
    const tryingCount = selectedBooks.length;

    if (currentCount >= 2) {
      setFeedback({ type: 'error', text: 'Este membro já possui 2 livros emprestados e é incapaz de pegar mais.' });
      return;
    }

    if (currentCount === 1 && tryingCount === 2) {
      setStep(2);
      setBookToBorrow(selectedBooks[0]);
      return;
    }

    processarEmprestimo(selectedBooks, membro.identificador);
  };

  const processarEmprestimo = async (livrosParaEmprestar, membroId) => {
    for (let titulo of livrosParaEmprestar) {
      await fetch('http://localhost:8000/emprestimos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo_livro: titulo, identificador_membro: membroId })
      });
    }
    setModalOpen(false);
    setSelectedBooks([]);
    fetchData();
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>Empréstimo</Typography>
      <Card variant="outlined">
        <CardContent>
          <List>
            {livros.map((livro, idx) => {
              const isIndisponivel = livro.disponiveis === 0;
              return (
                <ListItem key={idx} disablePadding>
                  <Checkbox
                    edge="start"
                    checked={selectedBooks.indexOf(livro.titulo) !== -1}
                    onChange={() => handleToggleBook(livro.titulo)}
                    disabled={isIndisponivel || (selectedBooks.length >= 2 && selectedBooks.indexOf(livro.titulo) === -1)}
                  />
                  <ListItemText
                    primary={livro.titulo}
                    secondary={`Disponíveis: ${livro.disponiveis} / ${livro.quantidade}`}
                    sx={{ color: isIndisponivel ? 'text.disabled' : 'text.primary' }}
                  />
                </ListItem>
              );
            })}
          </List>
          <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
            Emprestar
          </Button>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirmar Empréstimo</DialogTitle>
        <DialogContent>
          {feedback && <Alert severity={feedback.type} sx={{ mb: 2 }}>{feedback.text}</Alert>}
          {step === 1 ? (
            <TextField
              autoFocus
              margin="dense"
              label="Nome ou Identificador do Membro"
              fullWidth
              variant="outlined"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
            />
          ) : (
            <Box>
              <Typography gutterBottom>Você já pegou um livro, só poderá escolher mais um:</Typography>
              <RadioGroup value={bookToBorrow} onChange={(e) => setBookToBorrow(e.target.value)}>
                {selectedBooks.map((t, idx) => (
                  <FormControlLabel key={idx} value={t} control={<Radio />} label={t} />
                ))}
              </RadioGroup>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          {step === 1 ? (
            <Button variant="contained" onClick={handleVerificar}>Verificar</Button>
          ) : (
            <Button variant="contained" onClick={() => processarEmprestimo([bookToBorrow], identificador)}>Confirmar</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}