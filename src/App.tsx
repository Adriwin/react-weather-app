import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from './components/MainPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
