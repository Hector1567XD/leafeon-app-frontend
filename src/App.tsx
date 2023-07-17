import { useAppSelector } from "store";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// Own
import Routes from "routes";
import themes from "themes";
import NavigationScroll from "layout/NavigationScroll";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useAppSelector((state) => state.customization);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};

export default App;
