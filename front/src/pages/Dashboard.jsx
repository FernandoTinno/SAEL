import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { PieChart } from '@mui/x-charts/PieChart';

const summaryCards = [
  { title: 'Livros cadastrados', value: '0', helper: 'Total no acervo', icon: <MenuBookIcon color="primary" /> },
  { title: 'Membros ativos', value: '0', helper: 'Usuarios da biblioteca', icon: <PeopleIcon color="primary" /> },
  { title: 'Emprestimos em aberto', value: '0', helper: 'Aguardando devolucao', icon: <AssignmentReturnIcon color="primary" /> },
];

const emprestimos = [
  {
    nomeLivro: 'Clean Code',
    status: 'No prazo',
    membro: 'MB-1024',
    dataRetirada: '12/05/2026',
    dataDevolucao: '26/05/2026',
    tempoRestante: '1 dia',
  },
  {
    nomeLivro: 'Domain-Driven Design',
    status: 'Atrasado',
    membro: 'MB-0918',
    dataRetirada: '01/05/2026',
    dataDevolucao: '15/05/2026',
    tempoRestante: '10 dias atrasado',
  },
  {
    nomeLivro: 'Refactoring',
    status: 'Disponivel',
    membro: '-',
    dataRetirada: '-',
    dataDevolucao: '-',
    tempoRestante: '-',
  },
  {
    nomeLivro: 'JavaScript: The Good Parts',
    status: 'No prazo',
    membro: 'MB-1177',
    dataRetirada: '20/05/2026',
    dataDevolucao: '03/06/2026',
    tempoRestante: '9 dias',
  },
  {
    nomeLivro: 'Arquitetura Limpa',
    status: 'Disponivel',
    membro: '-',
    dataRetirada: '-',
    dataDevolucao: '-',
    tempoRestante: '-',
  },
];

const statusColor = {
  Disponivel: 'success',
  'No prazo': 'primary',
  Atrasado: 'error',
};

const statusSummary = [
  {
    label: 'Emprestados',
    status: 'No prazo',
    color: '#2563eb',
  },
  {
    label: 'Disponiveis',
    status: 'Disponivel',
    color: '#16a34a',
  },
  {
    label: 'Atrasados',
    status: 'Atrasado',
    color: '#dc2626',
  },
].map((item) => {
  const count = emprestimos.filter((emprestimo) => emprestimo.status === item.status).length;
  const percentage = Math.round((count / emprestimos.length) * 100);

  return {
    ...item,
    count,
    percentage,
  };
});

const chartData = statusSummary.map((item) => ({
  id: item.status,
  value: item.count,
  label: item.label,
  color: item.color,
}));

export default function Dashboard() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Visao geral do sistema de biblioteca.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {summaryCards.map((card) => (
          <Grid key={card.title} item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                      {card.value}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {card.helper}
                    </Typography>
                  </Box>
                  {card.icon}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Detalhes
            </Typography>

            <TableContainer>
              <Table size="small" aria-label="Detalhes dos emprestimos">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>Nome livro</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Membros</TableCell>
                    <TableCell>Data de retirada</TableCell>
                    <TableCell>Data devolucao</TableCell>
                    <TableCell>Tempo que resta para devolucao</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emprestimos.map((emprestimo) => (
                    <TableRow key={`${emprestimo.nomeLivro}-${emprestimo.membro}`} hover>
                      <TableCell padding="checkbox">
                        <Checkbox size="small" />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{emprestimo.nomeLivro}</TableCell>
                      <TableCell>
                        <Chip
                          label={emprestimo.status}
                          color={statusColor[emprestimo.status]}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{emprestimo.membro}</TableCell>
                      <TableCell>{emprestimo.dataRetirada}</TableCell>
                      <TableCell>{emprestimo.dataDevolucao}</TableCell>
                      <TableCell>{emprestimo.tempoRestante}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Livros por status
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              <Box sx={{ position: 'relative', width: 260, height: 260, flexShrink: 0 }}>
                <PieChart
                  width={260}
                  height={260}
                  colors={statusSummary.map((item) => item.color)}
                  series={[
                    {
                      data: chartData,
                      innerRadius: 72,
                      outerRadius: 104,
                      paddingAngle: 1,
                      cornerRadius: 4,
                      cx: 125,
                      cy: 125,
                    },
                  ]}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {emprestimos.length}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Total
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Stack spacing={2} sx={{ width: '100%', maxWidth: 520 }}>
                {statusSummary.map((item) => (
                  <Box key={item.status}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: item.color,
                          }}
                        />
                        <Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>
                      </Stack>
                      <Typography color="text.secondary">
                        {item.percentage}% ({item.count})
                      </Typography>
                    </Stack>
                    <Box sx={{ height: 8, borderRadius: 999, bgcolor: 'action.hover', overflow: 'hidden' }}>
                      <Box
                        sx={{
                          width: `${item.percentage}%`,
                          height: '100%',
                          borderRadius: 999,
                          bgcolor: item.color,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
