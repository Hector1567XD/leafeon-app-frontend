import { Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

const ecoPhrases = [
  'Cuida la naturaleza y ella cuidará de ti',
  'El planeta no necesita que lo salves, necesita que no lo destruyas',
  'Reduce, reutiliza y recicla',
  'Pequeñas acciones pueden marcar una gran diferencia',
  'La naturaleza es nuestra casa, cuidémosla',
  'El cambio comienza con nosotros',
  'La tierra es un regalo, cuidémosla para las futuras generaciones',
];

function EcoMessage() {
  const [message, setMessage] = useState('');

  const getMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ecoPhrases.length);
    return ecoPhrases[randomIndex];
  }, []);

  useEffect(() => {
    setMessage(getMessage());
  }, [getMessage]);

  return (
    <Typography variant="caption">
      {message}
    </Typography>
  );
}

export default React.memo(EcoMessage);