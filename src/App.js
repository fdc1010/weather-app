import { ThemeProvider } from 'react-bootstrap';
import { GlobalProvider } from './context/GlobalState';
import Routes from './routes';

export default function App() {
  return <GlobalProvider>
            <ThemeProvider
              breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              minBreakpoint="xxs">
                <Routes />
            </ThemeProvider>
          </GlobalProvider>;
}
