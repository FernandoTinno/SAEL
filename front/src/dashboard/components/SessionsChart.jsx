import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function SessionsChart() {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Emprestimos por dia
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              42
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Movimentacao de emprestimos nos ultimos 30 dias
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'emprestimos',
              label: 'Emprestimos',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                2, 1, 3, 4, 2, 5, 3, 2, 4, 6, 3, 5, 7, 4, 6, 3, 4, 5, 7, 8, 5, 6,
                4, 7, 6, 5, 8, 9, 6, 7,
              ],
            },
            {
              id: 'devolucoes',
              label: 'Devolucoes',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                1, 2, 2, 3, 2, 4, 1, 3, 4, 3, 2, 4, 5, 3, 4, 2, 5, 3, 4, 6, 5, 4,
                6, 5, 4, 3, 6, 7, 5, 6,
              ],
            },
            {
              id: 'atrasos',
              label: 'Atrasos',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: [
                0, 0, 1, 1, 0, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 0, 1, 2, 2, 3, 1, 2,
                2, 1, 2, 3, 2, 2, 3, 2,
              ],
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-atrasos': {
              fill: "url('#atrasos')",
            },
            '& .MuiAreaElement-series-devolucoes': {
              fill: "url('#devolucoes')",
            },
            '& .MuiAreaElement-series-emprestimos': {
              fill: "url('#emprestimos')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="atrasos" />
          <AreaGradient color={theme.palette.primary.main} id="devolucoes" />
          <AreaGradient color={theme.palette.primary.light} id="emprestimos" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
