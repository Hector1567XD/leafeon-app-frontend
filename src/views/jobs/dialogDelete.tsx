import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styled from 'styled-components';
// Own
import { FunctionComponent} from 'react';

const DialogDelete: FunctionComponent<Prop> = ({  open, id, handleClose, className, onDelete }) => {
    return (
      <div className={className}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-delete-title"
          aria-describedby="alert-delete-description"
        >
          <DialogTitle id="alert-delete-title">{"Confirmación"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-description">
              ¿Está seguro de querer borrar este elemento?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancelar</Button>
            <Button onClick={() => onDelete(id)} color="primary">Aceptar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

interface Prop {
  open: boolean;
  id: number;
  handleClose: () => void;
  className?: string;
  onDelete: (id: number) => void;
}

export default styled(DialogDelete)`
    display: flex;
    flex-direction: column;

    .paginator-container {
        margin-top: 12px;
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
`;
