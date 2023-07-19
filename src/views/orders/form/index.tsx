import { styled } from 'styled-components';
import Form from './form'

export default styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .page-header-container {
    padding-bottom: 18.5px;
  }
  
  .page-header {
    width: 100%;    
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
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

  .field-form {
    margin: 12px 0px;
  }

  .container-form-employees {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  . {
    display: grid;
    grid-column-gap: 20px;
  }

  .activites-crud {
    grid-column: span 2;
  }

  .field-form2-field {
    flex: 1;
    width: 100%;
  }

  .field-form2 {
    margin: 12px 0px;
    grid-column-gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .field-error {
    color: red;
  }

  .field-form2-with-error {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .container-form-employees-full-grid {
    grid-template-columns: 1fr; /* una sola columna */
    grid-column-gap: 0; /* sin espacio entre columnas */
    padding: 0; /* sin padding */
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .container-form-employees {
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
