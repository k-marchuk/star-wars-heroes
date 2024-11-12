import { Outlet } from 'react-router-dom';
import '@/App.css';

function App() {
  return (
    <div className="container mx-auto min-h-screen flex-col items-center">
      <Outlet />
    </div>
  );
}

export default App;
