// ─── Navegação ────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
}

// ─── Botão ────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  label:    string
  variant?: ButtonVariant
  size?:    ButtonSize
  href?:    string
  external?: boolean
  disabled?: boolean
  loading?:  boolean
  icon?:     string
}

// ─── Serviços ─────────────────────────────────────────────
export interface Service {
  id:          number
  icon:        string
  title:       string
  description: string
  highlight?:  boolean
}

// ─── Testemunhos ──────────────────────────────────────────
export interface Testimonial {
  id:         number
  name:       string
  role:       string
  avatar?:    string
  quote:      string
  rating:     number
  initials:   string
}

// ─── Estatísticas ─────────────────────────────────────────
export interface Stat {
  id:      number
  value:   number
  suffix:  string
  label:   string
  icon?:   string
}

// ─── FAQ ──────────────────────────────────────────────────
export interface FAQItem {
  id:       number
  question: string
  answer:   string
}

// ─── Trainer ──────────────────────────────────────────────
export interface Trainer {
  name:        string
  role:        string
  bio:         string
  image?:      string
  certifications: string[]
  socials?: {
    instagram?: string
    linkedin?:  string
    youtube?:   string
  }
}