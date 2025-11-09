import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './context/AuthProvider'
import router from './routes/router'
import { RouterProvider } from 'react-router-dom'
// import { RouterProvider } from "react-router/dom";
// import AuthProvider from './context/AuthProvider';
// import router from './routes/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
)
