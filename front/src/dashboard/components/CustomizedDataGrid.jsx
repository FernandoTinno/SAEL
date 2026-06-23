
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

const columns = [
  { field: 'titulo', headerName: 'Nome do livro', flex: 1.5, minWidth: 160 },
  { field: 'autor', headerName: 'Autor', flex: 1, minWidth: 130 },
  { field: 'ano', headerName: 'Ano', flex: 0.5, minWidth: 70 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 110,
    renderCell: (params) => {
      const isDisponivel = params.row.disponiveis > 0;
      return (
        <Chip
          label={isDisponivel ? 'Disponível' : 'Indisponível'}
          color={isDisponivel ? 'success' : 'error'}
          size="small"
        />
      );
    },
  },
  { field: 'quantidade', headerName: 'Qtd Total', headerAlign: 'right', align: 'right', flex: 0.5, minWidth: 80 },
  { field: 'disponiveis', headerName: 'Disponíveis', headerAlign: 'right', align: 'right', flex: 0.6, minWidth: 90 },
];

export default function CustomizedDataGrid({ livros = [] }) {
  const rows = (livros || []).map((livro, index) => ({
    id: index + 1,
    titulo: livro.titulo || '-',
    autor: livro.autor || '-',
    ano: livro.ano || '-',
    quantidade: livro.quantidade || 0,
    disponiveis: livro.disponiveis || 0,
  }));

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="standard"
      rowHeight={56}
      columnHeaderHeight={48}
      sx={{ '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' } }}
      localeText={{
        MuiTablePagination: {
          labelRowsPerPage: 'Itens por página',
        },
      }}
    />
  );
}