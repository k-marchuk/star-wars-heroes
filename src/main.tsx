import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import '@/index.css';
import { Root } from '@/Root';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Root />
  </Router>
);
