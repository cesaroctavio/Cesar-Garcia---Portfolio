import React from "react";
import { Pause, Play } from "lucide-react";
import { SCENES, Sidebar } from "./scenes";
import { StageContext } from "./stage";
import "./demo.css";

const REDUCED = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(() => window.matchMedia(REDUCED).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(REDUCED);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Scene time in ms for the run identified by `key`. Advances only while `playing`,
 * repaints about 30 times a second, and calls onEnd once `duration` is reached.
 * Keeping the key next to the time means a new run never renders with the old run's time.
 */
function useSceneClock(key: number, duration: number, playing: boolean, onEnd: () => void) {
  const [clock, setClock] = React.useState({ key, t: 0 });
  const elapsed = React.useRef({ key, ms: 0 });
  const end = React.useRef(onEnd);
  React.useEffect(() => {
    end.current = onEnd;
  });

  React.useEffect(() => {
    if (!playing) return;
    if (elapsed.current.key !== key) elapsed.current = { key, ms: 0 };
    let raf = 0;
    let last = performance.now();
    let painted = 0;
    const tick = (now: number) => {
      elapsed.current.ms += Math.min(now - last, 100);
      last = now;
      if (elapsed.current.ms >= duration) {
        setClock({ key, t: duration });
        end.current();
        return;
      }
      if (now - painted >= 33) {
        painted = now;
        setClock({ key, t: elapsed.current.ms });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, duration, playing]);

  return clock.key === key ? clock.t : 0;
}

// A made-up QA app that plays a failing check through trace, AI triage, a ticket and the board.
export function CheckpointDemo() {
  const [{ index, run }, setScene] = React.useState({ index: 0, run: 0 });
  const [userPaused, setUserPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [pageHidden, setPageHidden] = React.useState(() => document.hidden);
  const reduced = useReducedMotion();
  const [booted, setBooted] = React.useState(reduced);
  const [scale, setScale] = React.useState(1);
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const scene = SCENES[index];
  const playing = booted && visible && !hovered && !userPaused && !pageHidden && !reduced;
  const next = React.useCallback(
    () => setScene((s) => ({ index: (s.index + 1) % SCENES.length, run: s.run + 1 })),
    [],
  );
  const clockT = useSceneClock(run, scene.duration, playing, next);
  const t = reduced ? scene.still : clockT;

  // Lay the window out at its design width, then scale it to fit.
  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;
    const update = () => setScale(Math.min(1, viewport.clientWidth / stage.offsetWidth));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

    React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !("IntersectionObserver" in window)) {
      setBooted(true);
      setVisible(true);
      return;
    }
    // Boot as soon as any of it shows, so the hero never has a blank gap; play from 30% in view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBooted(true);
        setVisible(entry.intersectionRatio >= 0.3);
      },
      { threshold: [0, 0.3] },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const select = (i: number) => setScene((s) => ({ index: i, run: s.run + 1 }));

  const onTabKey = (e: React.KeyboardEvent) => {
    const last = SCENES.length - 1;
    const moves: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    select(moves[e.key]);
    tabRefs.current[moves[e.key]]?.focus();
  };

  const Scene = scene.Scene;

  return (
    <figure className="cp" data-paused={!playing || undefined}>
      <div className="cp-bar">
        <div className="cp-tabs" role="tablist" aria-label="Checkpoint demo scenes" onKeyDown={onTabKey}>
          {SCENES.map((s, i) => {
            const Icon = s.icon;
            const selected = i === index;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`cp-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="cp-panel"
                tabIndex={selected ? 0 : -1}
                className="cp-tab"
                onClick={() => select(i)}
              >
                <Icon aria-hidden="true" />
                <span className="cp-tab__label">{s.label}</span>
                {selected && !reduced && (
                  <span
                    className="cp-tab__progress"
                    style={{ "--p": t / scene.duration } as React.CSSProperties}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
        {!reduced && (
          <button
            type="button"
            className="cp-pause"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play demo" : "Pause demo"}
          >
            {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        )}
      </div>

      <div role="tabpanel" id="cp-panel" aria-labelledby={`cp-tab-${scene.id}`} className="cp-panel">
        <p className="visually-hidden">{scene.description}</p>
        <div
          ref={viewportRef}
          className="cp-viewport"
          data-booted={booted || undefined}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <div
            ref={stageRef}
            className="cp-stage"
            style={{ "--s": scale } as React.CSSProperties}
            aria-hidden="true"
          >
            <div className="cp-window">
              <Sidebar active={scene.id} />
              <div className="cp-main">
                <StageContext.Provider value={{ scale, showCursor: !reduced }}>
                  <Scene key={run} t={t} />
                </StageContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="cp-note">
        Checkpoint is a made-up app. The 55 specs and 17 storefronts are real.
      </figcaption>
    </figure>
  );
}
