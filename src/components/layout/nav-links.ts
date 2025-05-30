
import type { LucideIcon } from 'lucide-react';
import { Home, PenSquare, Languages, Trophy, GraduationCap, Gamepad2, ShoppingCart, Sparkles, MapPinned, Wrench } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'S4NT1 Home', icon: Home, tooltip: "Home" },
  { href: '/karting-hub', label: 'Karting Hub', icon: MapPinned, tooltip: "Directorio de Pistas" },
  { href: '/parts-catalog', label: 'Catálogo de Piezas', icon: Wrench, tooltip: "Piezas y Proveedores" },
  { href: '/social-wizard', label: 'Social Wizard', icon: Sparkles, tooltip: "Social Media Wizard" },
  { href: '/language-maestro', label: 'Language Maestro', icon: Languages, tooltip: "Multilingual Chat" },
  { href: '/santiagos-world', label: "Santiago's World", icon: Trophy, tooltip: "Santiago's Hub" },
  { href: '/karting-academy', label: 'Karting Academy', icon: GraduationCap, tooltip: "Technical Explainer" },
  { href: '/fan-zone', label: 'Fan Zone', icon: Gamepad2, tooltip: "Fan Mode" },
  { href: '/shop', label: 'S4NT1 Shop', icon: ShoppingCart, tooltip: "Digital Store" },
];
