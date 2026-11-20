import React from "react";

// Shared by the demo frame and its scenes: the current stage scale and whether the cursor is shown.
export const StageContext = React.createContext({ scale: 1, showCursor: true });

/** One cursor keyframe: from `at` ms the cursor sits on the element tagged data-cursor={target}. */
export type CursorStep = { at: number; target: string; press?: boolean };

/** Characters of `text` typed by time t, one every `perChar` ms from `start`. */
export function typed(text: string, t: number, start: number, perChar = 42) {
  if (t < start) return "";
  return text.slice(0, Math.min(text.length, Math.floor((t - start) / perChar) + 1));
}

/** Words of `text` streamed by time t, one every `perWord` ms from `start`. */
export function streamed(text: string, t: number, start: number, perWord = 70) {
  if (t < start) return "";
  const words = text.split(" ");
  return words.slice(0, Math.min(words.length, Math.floor((t - start) / perWord) + 1)).join(" ");
}

/** True for the short moment a button looks pressed after a click at `at`. */
export const pressing = (t: number, at: number) => t >= at && t < at + 220;

type Carry = { from: number; to: number; node: React.ReactNode };

/**
 * A fake pointer. It glides to whichever element the current keyframe names,
 * measured in stage pixels so it lands right at any scale, and ripples on a press.
 */
export function Cursor({ t, path, carry }: { t: number; path: CursorStep[]; carry?: Carry }) {
  const { scale, showCursor } = React.useContext(StageContext);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const placed = React.useRef(false);
  const [pos, setPos] = React.useState<{ x: number; y: number; instant: boolean } | null>(null);

  const index = path.reduce((found, step, i) => (t >= step.at ? i : found), -1);
  const step = index >= 0 ? path[index] : null;

  React.useLayoutEffect(() => {
    const cursor = ref.current;
    const frame = cursor?.offsetParent as HTMLElement | null;
    if (!cursor || !frame || !step) return;
    const target = frame.querySelector<HTMLElement>(`[data-cursor="${step.target}"]`);
    if (!target) return;
    const f = frame.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const k = f.width / frame.offsetWidth || 1;
    setPos({
      x: (r.left - f.left + r.width * 0.55) / k,
      y: (r.top - f.top + r.height * 0.6) / k,
      instant: !placed.current,
    });
    placed.current = true;
    // Re-measure only when the keyframe or the stage scale changes, not on every tick.
  }, [index, scale]);

  if (!showCursor) return null;
  const carrying = carry && t >= carry.from && t < carry.to;
  return (
    <div
      ref={ref}
      className="cp-cursor"
      data-hidden={!pos || undefined}
      data-instant={pos?.instant || undefined}
      style={pos ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
    >
      {step?.press && <span key={index} className="cp-cursor__ripple" />}
      {carrying && <div className="cp-cursor__carry">{carry.node}</div>}
      <svg className="cp-cursor__arrow" data-pressing={(step?.press && pressing(t, step.at)) || undefined} viewBox="0 0 24 24">
        <path d="M3 2v17.2l4.6-4.4 3.1 6.7 2.6-1.2-3.1-6.6h6.4z" />
      </svg>
    </div>
  );
}
