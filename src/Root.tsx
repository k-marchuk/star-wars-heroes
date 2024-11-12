import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from '@/App';
import { CharactersPage } from '@/pages/CharactersPage';
import { HomePage } from '@/pages/HomePage';
import { CharacterPage } from '@/pages/CharacterPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<CharactersPage />} />
          <Route path="people">
            <Route path=":characterId" element={<CharacterPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
