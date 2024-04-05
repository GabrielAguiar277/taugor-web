import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './domain/auth-management/context/AuthProvider.tsx';
import { UploadProvide } from './domain/upload-management/context/UploadProvider.tsx';
import { EmployeeProvider } from './domain/employee-management/context/EmployeeProvider.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DocumentProvider } from './domain/document-management/context/DocumentContext.tsx';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ ptBR }>
      <AuthProvider>
        <DocumentProvider>
          <EmployeeProvider>
            <UploadProvide>
              <App />
            </UploadProvide>
          </EmployeeProvider>
        </DocumentProvider>
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
