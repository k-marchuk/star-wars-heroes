import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { NotFoundPage } from './components/NotFoundPage';
import { CharactersPage } from './components/CharactersPage';
import { HomePage } from './components/HomePage';
import { CharacterPage } from './components/CharacterPage';

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

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
