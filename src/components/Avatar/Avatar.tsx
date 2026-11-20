import { Children, useState, type HTMLAttributes, type ReactNode } from 'react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarPresence = 'online' | 'busy' | 'away' | 'offline';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name. Used for the initials fallback, the colour and the accessible name. */
  name?: string;
  /** Image URL. If it fails to load, initials are shown. */
  src?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  presence?: AvatarPresence;
  /** Shown when there is no `name` and no image (for example a bot or an anonymous user). */
  icon?: ReactNode;
}

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

export function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}
function toneFor(name = '') {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/** A person, team or bot. Falls back from image to initials to icon. */
export function Avatar({ name, src, size = 'md', shape = 'circle', presence, icon, className, 'aria-label': ariaLabel, ...rest }: AvatarProps) {
  const [failed, setFailed] = useState<string | null>(null);
  const showImg = !!src && failed !== src;
  const label = [name, presence].filter(Boolean).join(', ') || ariaLabel;
  const cls = ['ds-avatar', `ds-avatar--${size}`, shape === 'square' && 'ds-avatar--square', `ds-avatar--${toneFor(name)}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls} role={label ? 'img' : undefined} aria-label={label || undefined} {...rest}>
      {showImg ? (
        <img className="ds-avatar__img" src={src} alt="" onError={() => setFailed(src!)} />
      ) : name ? (
        <span className="ds-avatar__text" aria-hidden="true">{initials(name)}</span>
      ) : (
        <span className="ds-avatar__text" aria-hidden="true">{icon}</span>
      )}
      {presence && <span className={`ds-avatar__presence ds-avatar__presence--${presence}`} aria-hidden="true" />}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Avatars shown before collapsing the rest into “+N”. */
  max?: number;
  size?: AvatarSize;
  children: ReactNode;
}

/** Overlapping stack of avatars. */
export function AvatarGroup({ max = 4, size = 'md', className, children, ...rest }: AvatarGroupProps) {
  const all = Children.toArray(children);
  const shown = all.length > max ? all.slice(0, max - 1) : all;
  const hidden = all.length - shown.length;
  return (
    <div role="group" className={['ds-avatar-group', className].filter(Boolean).join(' ')} {...rest}>
      {shown}
      {hidden > 0 && (
        <span className={`ds-avatar ds-avatar--${size} ds-avatar--neutral ds-avatar--more`} role="img" aria-label={`${hidden} more`}>
          <span className="ds-avatar__text" aria-hidden="true">+{hidden}</span>
        </span>
      )}
    </div>
  );
}
