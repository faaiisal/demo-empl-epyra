import { type ClassValue, clsx } from 'clsx'

// Simple className merger — install clsx: npm i clsx
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
