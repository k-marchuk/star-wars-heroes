import { Route, Routes, Navigate } from 'react-router-dom';
import App from '@/App';
import { CharactersPage } from '@/pages/CharactersPage';
import { HomePage } from '@/pages/HomePage';
import { CharacterPage } from '@/pages/CharacterPage';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Caches data for 5 mins.
      refetchOnWindowFocus: false,
    },
  },
});

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};
