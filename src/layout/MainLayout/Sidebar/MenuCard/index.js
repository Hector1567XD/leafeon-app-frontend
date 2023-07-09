import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import { IconChristmasTree } from '@tabler/icons';

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.secondary.light,
  marginBottom: '22px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '157px',
    height: '157px',
    background: theme.palette.secondary[200],
    borderRadius: '50%',
    top: '-105px',
    right: '-96px'
  }
}));

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
  const theme = useTheme();

  return (
    <CardStyle>
      <CardContent sx={{ p: 2 }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  color: theme.palette.secondary.main,
                  border: 'none',
                  borderColor: theme.palette.secondary.main,
                  background: '#fff',
                  marginRight: '12px'
                }}
              >
                <IconChristmasTree fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0 }}
              primary={
                <Typography variant="subtitle1" sx={{ color: theme.palette.secondary[800] }}>
                  Leafeon
                </Typography>
              }
              secondary={<Typography variant="caption"> "Cuida la naturaleza y ella cuidará de ti."</Typography>}
            />
          </ListItem>
        </List>
      </CardContent>
    </CardStyle>
  );
};

export default MenuCard;
