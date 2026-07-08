import { Hero } from './Hero'
import { TheWord } from './TheWord'
import { Awakening } from './Awakening'
import { Atelier } from './Atelier'
import { BeyondHome } from './BeyondHome'
import { Marque } from './Marque'
import { Coda } from './Coda'
import { useInteractions } from '../hooks/useInteractions'
import { useEngine } from '../hooks/useEngine'

interface MainLandingProps {
  isMobile: boolean
  onNavigate: (path: string) => void
}

export function MainLanding({ isMobile, onNavigate }: MainLandingProps) {
  useInteractions()
  useEngine({ ambientMotion: true, particleDensity: isMobile ? 0.6 : 1, dataLight: '#9FE8DC' })

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TheWord />
      <Awakening />
      <Atelier />
      <BeyondHome onNavigate={onNavigate} />
      <Marque />
      <Coda />
    </>
  )
}
