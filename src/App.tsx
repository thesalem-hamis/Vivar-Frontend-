// App.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './lib/trackPageView'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    trackPageView()
  }, [location.pathname])

  return <AppRoutes />
}