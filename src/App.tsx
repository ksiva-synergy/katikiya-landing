import { useEffect, useState } from 'react'
import { MainLanding } from './components/MainLanding'
import { Eldercare } from './components/Eldercare'
import { Toddlercare } from './components/Toddlercare'
import { Overlays } from './components/Overlays'

export function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/'
  })

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || 'ontouchstart' in window
    }
    return false
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Simple routing switch
  let pageContent
  if (currentPath === '/eldercare') {
    pageContent = <Eldercare onNavigate={navigateTo} />
  } else if (currentPath === '/toddlercare') {
    pageContent = <Toddlercare onNavigate={navigateTo} />
  } else {
    pageContent = <MainLanding isMobile={isMobile} onNavigate={navigateTo} />
  }

  return (
    <>
      {pageContent}
      <Overlays />
    </>
  )
}
