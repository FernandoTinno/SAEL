import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedDataGrid from './CustomizedDataGrid';
import StatCard from './StatCard';

const data = [
  {
    title: 'Livros cadastrados',
    value: '128',
    interval: 'Acervo atual',
    trend: 'up',
  },
  {
    title: 'Emprestimos ativos',
    value: '42',
    interval: 'Retiradas em aberto',
    trend: 'down',
  },
  {
    title: 'Membros cadastrados',
    value: '86',
    interval: 'Usuarios registrados',
    trend: 'neutral',
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Visao geral
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Detalhes
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartUserByCountry />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
