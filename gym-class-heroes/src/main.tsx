import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { GroupsProvider } from './context/GroupsContext.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider 
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
          signInFallbackRedirectUrl="/coaches"
          afterSignOutUrl="/"
        >
        <GroupsProvider>
          <App />
        </GroupsProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
)
