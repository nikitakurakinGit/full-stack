import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { GroupsProvider } from './context/GroupsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GroupsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GroupsProvider>
  </StrictMode>
)
