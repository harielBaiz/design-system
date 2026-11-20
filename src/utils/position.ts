export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Align = 'start' | 'center' | 'end';
export type Placement = Side | `${Side}-${'start' | 'end'}`;

const OPPOSITE: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

export function parsePlacement(p: Placement): [Side, Align] {
  const [side, align] = p.split('-') as [Side, 'start' | 'end' | undefined];
  return [side, align ?? 'center'];
}

function coords(a: DOMRect, f: { width: number; height: number }, side: Side, align: Align, gap: number) {
  let x = 0, y = 0;
  if (side === 'top') y = a.top - f.height - gap;
  else if (side === 'bottom') y = a.bottom + gap;
  else if (side === 'left') x = a.left - f.width - gap;
  else x = a.right + gap;
  if (side === 'top' || side === 'bottom') {
    x = align === 'start' ? a.left : align === 'end' ? a.right - f.width : a.left + a.width / 2 - f.width / 2;
  } else {
    y = align === 'start' ? a.top : align === 'end' ? a.bottom - f.height : a.top + a.height / 2 - f.height / 2;
  }
  return { x, y };
}

/**
 * Places a floating box next to an anchor. Flips to the opposite side when it does not fit,
 * then clamps inside the viewport. Returns fixed-position coordinates and the side actually used.
 */
export function computePosition(anchor: DOMRect, floating: { width: number; height: number }, placement: Placement, gap = 8, margin = 8) {
  const [want, align] = parsePlacement(placement);
  const vw = window.innerWidth, vh = window.innerHeight;
  const fits = (side: Side) => {
    const { x, y } = coords(anchor, floating, side, align, gap);
    if (side === 'top') return y >= margin;
    if (side === 'bottom') return y + floating.height <= vh - margin;
    if (side === 'left') return x >= margin;
    return x + floating.width <= vw - margin;
  };
  const side = fits(want) || !fits(OPPOSITE[want]) ? want : OPPOSITE[want];
  const pos = coords(anchor, floating, side, align, gap);
  const x = Math.min(Math.max(pos.x, margin), Math.max(margin, vw - floating.width - margin));
  const y = Math.min(Math.max(pos.y, margin), Math.max(margin, vh - floating.height - margin));
  return { x, y, side };
}
