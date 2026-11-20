import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode, type RefObject } from 'react';
import { computePosition, type Placement, type Side } from '../../utils/position';
import './Popover.css';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  open: boolean;
  /** Called when the popover asks to close (outside click, Escape). */
  onOpenChange?: (open: boolean) => void;
  /** The element the popover is attached to. */
  anchorRef: RefObject<HTMLElement | null>;
  placement?: Placement;
  /** Gap between anchor and popover, in px. */
  offset?: number;
  /** Make the popover at least as wide as the anchor (menus, selects). */
  matchWidth?: boolean;
  closeOnOutside?: boolean;
  closeOnEscape?: boolean;
  /** Visual surface. `plain` removes the card styling (Tooltip and Toast bring their own). */
  surface?: 'card' | 'plain';
  children: ReactNode;
}

/**
 * Anchored floating panel. Rendered in the browser top layer (Popover API), so it is never clipped
 * by `overflow` and needs no z-index. Flips and stays inside the viewport.
 * Building block for Dropdown, EmojiPicker and Tooltip.
 */
export function Popover({
  open, onOpenChange, anchorRef, placement = 'bottom-start', offset = 8, matchWidth,
  closeOnOutside = true, closeOnEscape = true, surface = 'card', className, style, children, ...rest
}: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; side: Side } | null>(null);

  // top layer on/off
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      if (open && !el.matches(':popover-open')) el.showPopover?.();
      if (!open && el.matches(':popover-open')) el.hidePopover?.();
    } catch { /* already in the requested state */ }
  }, [open]);

  const place = () => {
    const el = ref.current, anchor = anchorRef.current;
    if (!el || !anchor) return;
    const a = anchor.getBoundingClientRect();
    if (matchWidth) el.style.minWidth = `${a.width}px`;
    const next = computePosition(a, { width: el.offsetWidth, height: el.offsetHeight }, placement, offset);
    setPos((prev) => (prev && prev.x === next.x && prev.y === next.y && prev.side === next.side ? prev : next));
  };

  useLayoutEffect(() => { if (open) place(); });
  useEffect(() => {
    if (!open) return;
    const onMove = () => place();
    window.addEventListener('resize', onMove);
    window.addEventListener('scroll', onMove, true);
    const ro = typeof ResizeObserver !== 'undefined' && ref.current ? new ResizeObserver(onMove) : null;
    if (ro && ref.current) ro.observe(ref.current);
    return () => { window.removeEventListener('resize', onMove); window.removeEventListener('scroll', onMove, true); ro?.disconnect(); };
  }, [open, placement, offset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t) || anchorRef.current?.contains(t)) return;
      if (closeOnOutside) onOpenChange?.(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) { e.stopPropagation(); onOpenChange?.(false); }
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    return () => { document.removeEventListener('pointerdown', onDown, true); document.removeEventListener('keydown', onKey, true); };
  }, [open, closeOnOutside, closeOnEscape, onOpenChange, anchorRef]);

  const pstyle: CSSProperties = { ...style, left: pos?.x ?? 0, top: pos?.y ?? 0, visibility: pos ? undefined : 'hidden' };
  return (
    <div
      ref={ref}
      popover="manual"
      data-side={pos?.side}
      className={['ds-popover', surface === 'card' && 'ds-popover--card', className].filter(Boolean).join(' ')}
      style={pstyle}
      {...rest}
    >
      {open ? children : null}
    </div>
  );
}
