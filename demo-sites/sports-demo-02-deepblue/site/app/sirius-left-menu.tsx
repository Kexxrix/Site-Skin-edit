'use client';

// oxlint-disable next/no-img-element -- Locally generated photo artwork is presented without altering its bytes.

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';

export type SiriusLeftMenuId =
  | 'domestic'
  | 'european'
  | 'esports'
  | 'inplay'
  | 'casino'
  | 'slots';
export type SiriusLeftMenuAssets = Partial<
  Record<SiriusLeftMenuId, string | null>
>;

type Props = {
  mode: 'domestic' | 'european';
  onNavigate: (mode: 'domestic' | 'european') => void;
  assets?: SiriusLeftMenuAssets;
};

const menus: ReadonlyArray<{ id: SiriusLeftMenuId; title: string }> = [
  { id: 'domestic', title: '국내형 스포츠' },
  { id: 'european', title: '해외형 스포츠' },
  { id: 'esports', title: 'E 스포츠' },
  { id: 'inplay', title: '인플레이' },
  { id: 'casino', title: '카지노' },
  { id: 'slots', title: '슬롯' },
];

const particleStyles: CSSProperties[] = Array.from(
  { length: 7 },
  (_, index) =>
    ({
      '--slm-particle-x': `${12 + ((index * 17) % 74)}%`,
      '--slm-particle-y': `${17 + ((index * 23) % 62)}%`,
      '--slm-particle-delay': `${100 + index * 65}ms`,
    }) as CSSProperties,
);

/** Only real pointer movement changes the pending target; reflow-generated enters are ignored. */
export function SiriusLeftMenu({ mode, onNavigate, assets }: Props) {
  const prefix = useId();
  const [selection, setSelection] = useState<{
    mode: Props['mode'];
    id: SiriusLeftMenuId;
  }>({ mode, id: mode });
  // Reset previews on a page change without replacing the focused menu button.
  if (selection.mode !== mode) setSelection({ mode, id: mode });
  const expanded = selection.mode === mode ? selection.id : mode;
  const sectionRef = useRef<HTMLElement>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoreRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const candidateRef = useRef<SiriusLeftMenuId | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const lastRealPointerRef = useRef<{ x: number; y: number } | null>(null);
  const currentModeRef = useRef(mode);
  const keyboardFocusRef = useRef(false);

  function setExpanded(id: SiriusLeftMenuId) {
    setSelection((previous) =>
      previous.mode === mode && previous.id === id ? previous : { mode, id },
    );
  }

  function cancelPending() {
    if (pendingRef.current !== null) clearTimeout(pendingRef.current);
    pendingRef.current = null;
    candidateRef.current = null;
  }

  function cancelRestore() {
    if (restoreRef.current !== null) clearTimeout(restoreRef.current);
    restoreRef.current = null;
  }

  function preview(id: SiriusLeftMenuId) {
    cancelPending();
    cancelRestore();
    setExpanded(id);
  }

  function scheduleRestore() {
    cancelPending();
    cancelRestore();
    if (
      keyboardFocusRef.current &&
      sectionRef.current?.contains(document.activeElement)
    )
      return;
    restoreRef.current = setTimeout(() => {
      restoreRef.current = null;
      setExpanded(currentModeRef.current);
    }, 220);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch' || event.buttons !== 0) return;
    const real = lastRealPointerRef.current;
    if (real && event.clientX === real.x && event.clientY === real.y) return;
    const last = pointerRef.current;
    if (last && Math.hypot(event.clientX - last.x, event.clientY - last.y) < 2)
      return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    keyboardFocusRef.current = false;
    cancelRestore();
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-slm-menu]',
    );
    const id = button?.dataset.slmMenu as SiriusLeftMenuId | undefined;
    if (!id || id === expanded) {
      cancelPending();
      return;
    }
    if (candidateRef.current === id) return;
    cancelPending();
    candidateRef.current = id;
    pendingRef.current = setTimeout(() => {
      pendingRef.current = null;
      candidateRef.current = null;
      setExpanded(id);
    }, 160);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | undefined;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      next = (index + 1) % menus.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = (index + menus.length - 1) % menus.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = menus.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      keyboardFocusRef.current = true;
      buttonsRef.current[next]?.focus();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      preview(mode);
    }
  }

  useEffect(() => {
    currentModeRef.current = mode;
    if (pendingRef.current !== null) clearTimeout(pendingRef.current);
    if (restoreRef.current !== null) clearTimeout(restoreRef.current);
    pendingRef.current = null;
    restoreRef.current = null;
    candidateRef.current = null;
  }, [mode]);

  useEffect(() => {
    // The window listener runs after React's delegated move handler. Keeping
    // the last real coordinate outside the section ignores enters from reflow.
    function trackPointer(event: globalThis.PointerEvent) {
      if (event.pointerType !== 'touch')
        lastRealPointerRef.current = { x: event.clientX, y: event.clientY };
    }
    window.addEventListener('pointermove', trackPointer);
    return () => {
      window.removeEventListener('pointermove', trackPointer);
      if (pendingRef.current !== null) clearTimeout(pendingRef.current);
      if (restoreRef.current !== null) clearTimeout(restoreRef.current);
    };
  }, []);

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Parent-level pointer delegation avoids reflow-triggered hover loops; its children are keyboard-accessible buttons.
    <section
      ref={sectionRef}
      className="slm-menu"
      aria-label="스포츠 및 게임 메뉴"
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        scheduleRestore();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          keyboardFocusRef.current = false;
          scheduleRestore();
        }
      }}
    >
      {menus.map(({ id, title }, index) => {
        const open = id === mode || expanded === id;
        const navigable = id === 'domestic' || id === 'european';
        const image =
          assets && id in assets
            ? assets[id]
            : `/banners/sirius-left-accordion-20261001/${id}.webp`;
        return (
          <button
            key={id}
            ref={(node) => {
              buttonsRef.current[index] = node;
            }}
            type="button"
            className={`slm-item${open ? ' is-expanded' : ''}${id === mode ? ' is-current' : ''}`}
            data-slm-menu={id}
            data-menu-id={id}
            data-expanded={open ? 'true' : 'false'}
            data-preview={id !== mode && expanded === id ? 'true' : 'false'}
            data-slm-action={navigable ? 'navigate' : 'preview'}
            aria-label={navigable ? title : `${title} 미리보기`}
            aria-expanded={open}
            aria-controls={`${prefix}-${id}-scene`}
            aria-current={id === mode ? 'page' : undefined}
            onPointerDown={() => {
              keyboardFocusRef.current = false;
              cancelPending();
              cancelRestore();
            }}
            onFocus={(event) => {
              keyboardFocusRef.current =
                event.currentTarget.matches(':focus-visible');
              if (keyboardFocusRef.current) preview(id);
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={() => {
              preview(id);
              if (id === 'domestic' || id === 'european') onNavigate(id);
            }}
          >
            <span
              className="slm-scene"
              id={`${prefix}-${id}-scene`}
              aria-hidden="true"
            >
              {image && (
                <img
                  className="slm-photo"
                  src={image}
                  alt=""
                  width={1280}
                  height={160}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              )}
              <span className="slm-shade" />
              {open ? (
                <span className="slm-effects" key={`effects-${id}`}>
                  <span className="slm-sweep" />
                  {particleStyles.map((style, particle) => (
                    <i key={particle} className="slm-particle" style={style} />
                  ))}
                </span>
              ) : null}
            </span>
            <span className="slm-caption">
              <span className="slm-label">{title}</span>
            </span>
            <span className="slm-marker" aria-hidden="true">
              {navigable ? <ArrowUpRight /> : <Plus />}
            </span>
          </button>
        );
      })}
    </section>
  );
}
