import type { Painter } from '../engine'
import { water } from './water'
import { energy } from './energy'
import { presence } from './presence'
import { walls } from './walls'

export const painters: Record<string, Painter> = {
  water,
  energy,
  presence,
  walls,
}
