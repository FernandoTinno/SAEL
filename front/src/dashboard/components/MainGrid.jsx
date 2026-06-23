import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StatCard from './StatCard';
import CustomizedDataGrid from './CustomizedDataGrid';

export default function MainGrid() {
  const [livros, setLivros] = useState([]);
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resLivros = await fetch('http://localhost:8000/livros');
        if (resLivros.ok) {
          const dataLivros = await resLivros.json();
          setLivros(dataLivros || []);
        }

        const resMembros = await fetch('http://localhost:8000/membros');
        if (resMembros.ok) {
          const dataMembros = await resMembros.json();
          setMembros(dataMembros || []);
        }
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchData();
  }, []);

  const totalLivros = livros.reduce((acc, livro) => acc + (livro.quantidade || 0), 0);
  const emprestimosAtivos = livros.reduce((acc, livro) => acc + ((livro.quantidade || 0) - (livro.disponiveis || 0)), 0);
  const totalMembros = membros.length;

  const data = [
    {
      title: 'Livros cadastrados',
      value: totalLivros.toString(),
      interval: 'Acervo atual',
      trend: 'up',
    },
    {
      title: 'Empréstimos ativos',
      value: emprestimosAtivos.toString(),
      interval: 'Retiradas em aberto',
      trend: 'neutral',
    },
    {
      title: 'Membros cadastrados',
      value: totalMembros.toString(),
      interval: 'Usuários registrados',
      trend: 'up',
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Visão geral
      </Typography>
      <Grid container spacing={2} sx={{ mb: (theme) => theme.spacing(2) }}>
        {data.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Detalhes do Acervo
      </Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomizedDataGrid livros={livros} />
        </Grid>
      </Grid>
    </Box>
  );
}