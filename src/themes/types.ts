//import { Theme } from "@mui/material/styles";
import { CustomizationState } from 'store/customizationSlice';

//export type ThemeCustomized<T> = Theme & { customization: T };

export interface ThemeCustomOptions {
  colors: {
    [key: string]: string;
  };
  heading: string;
  paper: string;
  backgroundDefault: string;
  background: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
  customization: CustomizationState;
}
