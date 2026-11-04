export function AlunaLogo({ compact = false }: { compact?: boolean }) {
  return <span className={`aluna-logo ${compact ? 'aluna-logo-compact' : ''}`} aria-label="Aluna"><img src="/assets/aluna-logo.jpeg" alt="" />{!compact && <strong>Aluna</strong>}</span>;
}
