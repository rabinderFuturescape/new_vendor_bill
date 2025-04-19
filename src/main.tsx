
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    // Start the worker
    await worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    })
    console.log('Mock Service Worker initialized')
  }
}

// Initialize the MSW worker before rendering the app
prepare().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
})
