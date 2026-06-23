import { Link, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentReturnRoundedIcon from '@mui/icons-material/AssignmentReturnRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Acervo', icon: <LibraryBooksRoundedIcon />, path: '/acervo' },
  { text: 'Empréstimo', icon: <AssignmentRoundedIcon />, path: '/emprestimo' },
  { text: 'Devolução', icon: <AssignmentReturnRoundedIcon />, path: '/devolucao' },
  { text: 'Fila de Espera', icon: <PendingActionsRoundedIcon />, path: '/filaespera' },
  { text: 'Histórico', icon: <HistoryRoundedIcon />, path: '/historico' },
  { text: 'Cadastrar Livro', icon: <BookRoundedIcon />, path: '/cadastro-livro' },
  { text: 'Cadastrar Membro', icon: <PeopleRoundedIcon />, path: '/cadastro-membro' },
];

export default function MenuContent() {
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}