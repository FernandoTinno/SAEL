import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, List, ListItem, ListItemText,
  Radio, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Checkbox, FormGroup, FormControlLabel
} from '@mui/material';

export default function Devolucao() {
  const [membros, setMembros] = useState([]);
  const [selectedMembroId, setSelectedMembroId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReturnBooks, setSelectedReturnBooks] = useState([]);

  const fetchData = async () => {
    try {
      const resMembros = await fetch('http://localhost:8000/membros');
      const dataMembros = await resMembros.json();
      setMembros(dataMembros.filter(m => m.livros_emprestados && m.livros_emprestados.length > 0));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = () => {
    if (!selectedMembroId) {
      alert("Selecione um membro.");
      return;
    }
    const membro = membros.find(m => m.identificador === selectedMembroId);
    setSelectedReturnBooks([...membro.livros_emprestados]);
    setModalOpen(true);
  };

  const handleToggleReturnBook = (titulo) => {
    const currentIndex = selectedReturnBooks.indexOf(titulo);
    const newSelected = [...selectedReturnBooks];
    if (currentIndex === -1) {
      newSelected.push(titulo);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    setSelectedReturnBooks(newSelected);
  };

  const handleDevolver = async () => {
    if (selectedReturnBooks.length === 0) {
      alert("Selecione pelo menos um livro para devolver.");
      return;
    }
    
    for (let titulo of selectedReturnBooks) {
      await fetch('http://localhost:8000/devolucoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo_livro: titulo, identificador_membro: selectedMembroId })
      });
    }
    setModalOpen(false);
    setSelectedMembroId('');
    fetchData();
  };

  const selectedMembroObj = membros.find(m => m.identificador === selectedMembroId);

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>Devolução</Typography>
      <Card variant="outlined">
        <CardContent>
          <List>
            {membros.length === 0 ? <Typography>Nenhum membro com livros emprestados no momento.</Typography> :
              membros.map((membro, idx) => (
                <ListItem key={idx} disablePadding>
                  <Radio
                    checked={selectedMembroId === membro.identificador}
                    onChange={() => setSelectedMembroId(membro.identificador)}
                  />
                  <ListItemText
                    primary={membro.nome}
                    secondary={`Livros emprestados: ${membro.livros_emprestados.join(', ')}`}
                  />
                </ListItem>
              ))
            }
          </List>
          <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
            Devolver
          </Button>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Qual livro você gostaria de devolver?</DialogTitle>
        <DialogContent>
          <FormGroup>
            {selectedMembroObj && selectedMembroObj.livros_emprestados.map((titulo, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={selectedReturnBooks.indexOf(titulo) !== -1}
                    onChange={() => handleToggleReturnBook(titulo)}
                  />
                }
                label={titulo}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleDevolver}>
            Confirmar Devolução
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}