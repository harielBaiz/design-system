import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { PALETTE, PALETTE_HUES } from '../../tokens/palette';
import './Badge.css';

export type BadgeKind = 'label' | 'count';
export type BadgeType = 'default' | 'info' | 'positive' | 'warning' | 'critical' | 'bulletin' | 'ai' | 'overlay';
/** A palette hue and step, for example `blue-300`. For categories with a limited, known set of options. */
export type BadgeDecoration = `${(typeof PALETTE_HUES)[number]}-${200 | 300 | 400 | 500}`;

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** `label` shows text. `count` shows a number. Passing `count` selects the count kind for you. */
  kind?: BadgeKind;
  /**
   * The meaning of the badge. `default` has none. `info`, `positive`, `warning` and `critical` describe a state.
   * `bulletin` is for temporary activity such as unread counts. `ai` marks AI features (labels only).
   * `overlay` sits on top of an image.
   */
  type?: BadgeType;
  /** Adds a border and removes the fill. */
  outlined?: boolean;
  /** A lighter version. Only `bulletin` has one. */
  subtle?: boolean;
  /** The number for a count badge. Anything above `max` collapses, for example “99+”. */
  count?: number;
  max?: number;
  /** An icon name or your own icon, shown before the text. Not for counts. */
  startIcon?: IconName | ReactNode;
  endIcon?: IconName | ReactNode;
  /** Icon size in px. */
  iconSize?: number;
  /** Categorical colour from the palette. Label kind, `default` type and no icons only. */
  decoration?: BadgeDecoration;
  /** The label text. */
  children?: ReactNode;
}

function lum(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const onColor = (hex: string) => ((lum(hex) + 0.05) / 0.05 >= 1.05 / (lum(hex) + 0.05) ? '#000000' : '#ffffff');

const renderIcon = (i: IconName | ReactNode, size: number) => (typeof i === 'string' ? <Icon name={i as IconName} size={size} /> : i);

/**
 * A small marker for a status, a count or a short label. A badge is not interactive: it informs.
 * For something people can select, filter or remove, use `Chip`.
 */
export function Badge({
  kind, type = 'default', outlined, subtle, count, max = 99, startIcon, endIcon, iconSize = 12, decoration, className, style, children, ...rest
}: BadgeProps) {
  const isCount = (kind ?? (count !== undefined ? 'count' : 'label')) === 'count';
  const decorated = !!decoration && !isCount && type === 'default' && !startIcon && !endIcon;
  const cls = [
    'ds-badge',
    `ds-badge--${type}`,
    isCount && 'ds-badge--count',
    outlined && 'is-outlined',
    subtle && 'is-subtle',
    decorated && 'ds-badge--decorated',
    className,
  ].filter(Boolean).join(' ');

  let deco: CSSProperties | undefined;
  if (decorated) {
    const [hue, step] = decoration!.split('-') as [keyof typeof PALETTE, string];
    const hex = PALETTE[hue]?.[Number(step) as 200];
    if (hex) deco = { background: hex, color: onColor(hex), borderColor: 'transparent' };
  }

  const text = isCount ? (count !== undefined ? (count > max ? `${max}+` : String(count)) : children) : children;
  return (
    <span className={cls} style={{ ...deco, ...style }} {...rest}>
      {!isCount && startIcon && <span className="ds-badge__icon">{renderIcon(startIcon, iconSize)}</span>}
      {text}
      {!isCount && endIcon && <span className="ds-badge__icon">{renderIcon(endIcon, iconSize)}</span>}
    </span>
  );
}
