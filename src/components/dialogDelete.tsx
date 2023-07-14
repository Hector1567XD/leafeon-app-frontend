import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styled from 'styled-components';
// Own
import { FunctionComponent} from 'react';

const DialogDelete: FunctionComponent<Prop> = ({  open, handleClose, className, onDelete }) => {
  return (
    <div className={className}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-delete-title"
        aria-describedby="alert-delete-description"
      >
        <DialogTitle id="alert-delete-title" fontSize={"16px"}>{"Confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-delete-description">
            ¿Está seguro de querer borrar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" size='small'>Cancelar</Button>
          <Button onClick={() => onDelete()} color="primary" variant='contained' size='small'>Borrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface Prop {
  open: boolean;
  handleClose: () => void;
  className?: string;
  onDelete: () => void;
}

export default styled(DialogDelete)`
    display: flex;
    flex-direction: column;
    margin:
`;
