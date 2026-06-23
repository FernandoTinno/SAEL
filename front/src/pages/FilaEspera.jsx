import React, { useState, useEffect } from 'react';
import { 
  Typography, Card, CardContent, List, ListItem, ListItemText,
  Divider, Chip, Stack, TextField 
} from '@mui/material';

export default function FilaEspera() {
  const [livros, setLivros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLivros = async () => {
    try {
      const response = await fetch('http://localhost:8000/livros');
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const livrosIndisponiveis = livros.filter(livro => 
    livro.disponiveis === 0 && 
    livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Stack spacing={4} sx={{ maxWidth: 800 }}>
      <div>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Filas de Espera
        </Typography>
        <Typography color="text.secondary">
          Acompanhe o status de livros indisponíveis no momento.
        </Typography>
      </div>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquisar livro indisponível pelo nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {livrosIndisponiveis.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary">Não há livros indisponíveis no momento.</Typography>
          </CardContent>
        </Card>
      ) : (
        livrosIndisponiveis.map((livro, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="600">
                  📖 {livro.titulo}
                </Typography>
              </Stack>
              
              <Typography variant="body2" color="error" gutterBottom>
                Status: Esgotado (0 de {livro.quantidade})
              </Typography>
              
              <List disablePadding sx={{ mt: 2 }}>
                {livro.fila_espera.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                    
                  </Typography>
                ) : (
                  livro.fila_espera.map((nome, pos) => (
                    <React.Fragment key={pos}>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <Chip label={`${pos + 1}º da Fila`} color="primary" size="small" sx={{ mr: 2 }} />
                        <ListItemText primary={nome} />
                      </ListItem>
                      {pos < livro.fila_espera.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  );
}