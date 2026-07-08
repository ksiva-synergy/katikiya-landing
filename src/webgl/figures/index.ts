import type { Painter } from '../engine'
import { pulse } from './pulse'
import { sonar } from './sonar'
import { vision } from './vision'
import { water } from './water'
import { presence } from './presence'
import { manas } from './manas'
import { walls } from './walls'

export const painters: Record<string, Painter> = {
  pulse,
  sonar,
  vision,
  water,
  presence,
  manas,
  walls,
}
