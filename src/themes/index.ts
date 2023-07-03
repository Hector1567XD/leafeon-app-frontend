import { createTheme, PaletteOptions, Theme, ThemeOptions } from '@mui/material/styles';

// assets
import themeColors from './themeColors';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette, { CustomThemePalette } from './palette';
import themeTypography, { CustomThemeTypography } from './typography';
import { CustomizationState } from 'store/customizationSlice';
import { ThemeCustomOptions } from './types';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { CustomThemeComponents } from './compStyleOverride';
import { Typography } from '@mui/material';

export const theme = (customization: CustomizationState): CustomTheme => {
  const color = themeColors;

  const themeOption: ThemeCustomOptions = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization: customization
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption) as PaletteOptions,
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption) as TypographyOptions
  };
  
  const themes: CustomTheme = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

interface CustomTheme extends ThemeOptions {
  components?: { [key: string]: any };
}

export interface CustomedTheme extends Omit<Theme, 'typography' | 'palette'> {
  typography: Theme['typography'] & CustomThemeTypography;
  palette: Theme['palette'] & CustomThemePalette;
  components: CustomThemeComponents;
}

export default theme;
