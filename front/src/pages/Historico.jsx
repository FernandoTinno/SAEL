import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Stack } from '@mui/material';

export default function Historico() {
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await fetch('http://localhost:8000/membros');
        const data = await response.json();
        setMembros(data);
      } catch (error) {
        console.error('Erro ao buscar membros:', error);
      }
    };
    fetchMembros();
  }, []);

  return (
    <Stack spacing={4} sx={{ maxWidth: 800 }}>
      <div>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Histórico de Atividades
        </Typography>
        <Typography color="text.secondary">
          Registro completo de empréstimos e devoluções dos membros (Estrutura: Lista Encadeada).
        </Typography>
      </div>

      {membros.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary">Nenhum membro cadastrado para exibir histórico.</Typography>
          </CardContent>
        </Card>
      ) : (
        membros.map((membro, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                👤 {membro.nome} (ID: {membro.identificador})
              </Typography>
              
              {membro.historico && membro.historico.length > 0 ? (
                <List dense disablePadding>
                  {membro.historico.map((acao, pos) => (
                    <React.Fragment key={pos}>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText 
                          primary={`• ${acao}`} 
                          primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                        />
                      </ListItem>
                      {pos < membro.historico.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.disabled">
                  Nenhuma atividade registrada.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  );
}