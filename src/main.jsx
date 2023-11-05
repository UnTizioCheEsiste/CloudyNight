import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {NextUIProvider} from '@nextui-org/react';
import { QueryClientProvider, QueryClient } from "react-query";
import "./index.css";

const clientQuery = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={clientQuery}>
        <App />
      </QueryClientProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
