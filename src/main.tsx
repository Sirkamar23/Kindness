import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/lora/500.css'
import '@fontsource/noto-serif-armenian/400.css'
import '@fontsource/noto-serif-armenian/500.css'
import '@fontsource/caveat/500.css'
import './index.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
