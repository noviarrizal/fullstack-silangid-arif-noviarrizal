import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { store } from './store/store.ts'
import { requestInterceptors, responseInterceptors } from './lib/interceptor.ts'
import { Toaster } from 'sonner'

const queryClient = new QueryClient();
responseInterceptors();
requestInterceptors();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
