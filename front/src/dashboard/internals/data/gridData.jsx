import Chip from '@mui/material/Chip';

function renderStatus(status) {
  const colors = {
    Disponivel: 'success',
    Emprestado: 'primary',
    Atrasado: 'error',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export const columns = [
  { field: 'nomeLivro', headerName: 'Nome livro', flex: 1.2, minWidth: 180 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.7,
    minWidth: 110,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'membro',
    headerName: 'Membros',
    flex: 0.7,
    minWidth: 100,
  },
  {
    field: 'dataRetirada',
    headerName: 'Data de retirada',
    flex: 0.9,
    minWidth: 130,
  },
  {
    field: 'dataDevolucao',
    headerName: 'Data devolucao',
    flex: 0.9,
    minWidth: 130,
  },
  {
    field: 'tempoRestante',
    headerName: 'Tempo que resta para devolucao',
    flex: 1.5,
    minWidth: 250,
  },
];

export const rows = [
  {
    id: 1,
    nomeLivro: 'Clean Code',
    status: 'Emprestado',
    membro: 'MB-1024',
    dataRetirada: '12/05/2026',
    dataDevolucao: '26/05/2026',
    tempoRestante: '1 dia',
  },
  {
    id: 2,
    nomeLivro: 'Domain-Driven Design',
    status: 'Atrasado',
    membro: 'MB-0918',
    dataRetirada: '01/05/2026',
    dataDevolucao: '15/05/2026',
    tempoRestante: '10 dias atrasado',
  },
  {
    id: 3,
    nomeLivro: 'Refactoring',
    status: 'Disponivel',
    membro: '-',
    dataRetirada: '-',
    dataDevolucao: '-',
    tempoRestante: '-',
  },
  {
    id: 4,
    nomeLivro: 'JavaScript: The Good Parts',
    status: 'Emprestado',
    membro: 'MB-1177',
    dataRetirada: '20/05/2026',
    dataDevolucao: '03/06/2026',
    tempoRestante: '9 dias',
  },
  {
    id: 5,
    nomeLivro: 'Arquitetura Limpa',
    status: 'Disponivel',
    membro: '-',
    dataRetirada: '-',
    dataDevolucao: '-',
    tempoRestante: '-',
  },
  {
    id: 6,
    nomeLivro: 'O Programador Pragmatico',
    status: 'Emprestado',
    membro: 'MB-1120',
    dataRetirada: '18/05/2026',
    dataDevolucao: '01/06/2026',
    tempoRestante: '7 dias',
  },
  {
    id: 7,
    nomeLivro: 'Design Patterns',
    status: 'Atrasado',
    membro: 'MB-0881',
    dataRetirada: '28/04/2026',
    dataDevolucao: '12/05/2026',
    tempoRestante: '13 dias atrasado',
  },
  {
    id: 8,
    nomeLivro: 'Introducao a Algoritmos',
    status: 'Disponivel',
    membro: '-',
    dataRetirada: '-',
    dataDevolucao: '-',
    tempoRestante: '-',
  },
  {
    id: 9,
    nomeLivro: 'Sistemas Operacionais Modernos',
    status: 'Emprestado',
    membro: 'MB-1205',
    dataRetirada: '22/05/2026',
    dataDevolucao: '05/06/2026',
    tempoRestante: '11 dias',
  },
  {
    id: 10,
    nomeLivro: 'Banco de Dados',
    status: 'Disponivel',
    membro: '-',
    dataRetirada: '-',
    dataDevolucao: '-',
    tempoRestante: '-',
  },
];
