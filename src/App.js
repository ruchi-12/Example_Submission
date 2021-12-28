import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useEffect} from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import '../src/mixins/chartjs';
import theme from '../src/theme';
import routes from '../src/routes';

const currentUrl = window.location.href.substring(window.location.href.indexOf('#') + 1);
console.log('currentUrl : ',currentUrl);
const App = () => {
  const navigate = useNavigate();
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
