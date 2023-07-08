import {
  Alert,
  Snackbar,
} from '@mui/material';
import { FunctionComponent } from 'react';

export enum Severity {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

const SmallToast: FunctionComponent<Props> =({ message, autoHideDuration, severity, onClose,  }) => {
  return (
    <Snackbar open={!!message} autoHideDuration={autoHideDuration || 6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity || Severity.Success} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </Snackbar>
  );
}

interface Props {
  message: string | null;
  autoHideDuration?: number;
  onClose: () => void;
  severity?: Severity;
}

export default SmallToast;
