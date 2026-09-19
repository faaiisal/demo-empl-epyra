import { cn } from '@/lib/cn'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type Props = ButtonProps | AnchorProps

const variantClasses: Record<Variant, string> = {
  // Solid basalt → hover terracotta (primary nav & card CTAs)
  primary:
    'bg-[var(--color-basalt)] text-[var(--color-alabaster)] hover:bg-[var(--color-terracotta)] active:bg-[var(--color-terracotta-dark)] transition-colors duration-150',
  // Wire-frame
  secondary:
    'border border-[var(--color-basalt)] bg-transparent text-[var(--color-basalt)] hover:bg-[var(--color-basalt)] hover:text-[var(--color-alabaster)] transition-colors duration-150',
  // White wire-frame on dark backgrounds
  ghost:
    'border border-white/40 bg-transparent text-white hover:bg-white hover:text-[var(--color-basalt)] transition-colors duration-150',
  // Solid terracotta — high-value CTAs only ("Book a Visit")
  accent:
    'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-dark)] active:bg-[#bc4520] transition-colors duration-150',
}

const sizeClasses: Record<Size, string> = {
  sm: 'type-label-caps px-4 py-2',
  md: 'type-label-caps px-6 py-3',
  lg: 'type-label-caps px-8 py-4',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: Props) {
  const base = cn(
    'inline-flex items-center gap-2 cursor-pointer select-none',
    'rounded-none', // Sharp architecture — no border radius
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if ((rest as AnchorProps).as === 'a') {
    const { as: _as, ...anchorRest } = rest as AnchorProps
    return (
      <a className={base} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { as: _as, ...buttonRest } = rest as ButtonProps
  return (
    <button className={base} {...buttonRest}>
      {children}
    </button>
  )
}
