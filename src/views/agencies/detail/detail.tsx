import { styled } from 'styled-components';
import Detail from './detail.component';

export default styled(Detail)`
  display: flex;
  flex-direction: column;

  .container-form-services {
    display: grid;
    grid-template-columns: 1fr; /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  .container-form-services-full-grid {
    grid-template-columns: 1fr; /* una sola columna */
    grid-column-gap: 0; /* sin espacio entre columnas */
    padding: 0; /* sin padding */
  }

  @media screen and (max-width: 768px) { /* media query para dispositivos móviles */
    .container-form-services {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .field-form {
    margin: 12px 0px;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
