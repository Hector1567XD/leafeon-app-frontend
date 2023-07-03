import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// Own
import App from './App';
import store from 'store';

// Style + assets
import 'assets/scss/style.scss';
import config from './config';


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container!);


root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

