import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { TheWord } from './components/TheWord'
import { Awakening } from './components/Awakening'
import { Atelier } from './components/Atelier'
import { BeyondHome } from './components/BeyondHome'
import { Marque } from './components/Marque'
import { Coda } from './components/Coda'
import { Overlays } from './components/Overlays'
import { useInteractions } from './hooks/useInteractions'
import { useEngine } from './hooks/useEngine'

export function App() {
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

  useInteractions()
  useEngine({ ambientMotion: true, particleDensity: isMobile ? 0.6 : 1, dataLight: '#9FE8DC' })

  return (
    <>
      <Hero />
      <TheWord />
      <Awakening />
      <Atelier />
      <BeyondHome />
      <Marque />
      <Coda />
      <Overlays />
    </>
  )
}
