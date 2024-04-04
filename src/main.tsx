import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SpotifyProvider from './spotify/SpotifyProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SpotifyProvider>
        <App />
      </SpotifyProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
