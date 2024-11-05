import ReactDOM from 'react-dom/client';
import './index.css';
import { Root } from './Root';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <Root />
  </QueryClientProvider>
);
