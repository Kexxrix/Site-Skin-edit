'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { ArrowUp } from 'lucide-react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function HeightAccordion({ children, collapsed = false, version = 0, id, className, scrollRef, anchorRef, onFinish }: {
  children: ReactNode; collapsed?: boolean; version?: number; id?: string; className?: string;
  scrollRef?: RefObject<HTMLElement | null>; anchorRef?: RefObject<{ element: HTMLElement; top: number } | null>; onFinish?: () => void;
}) {
  const outer = useRef<HTMLDivElement>(null), inner = useRef<HTMLDivElement>(null);
  const previous = useRef<{ collapsed: boolean; version: number; height: number } | null>(null);
  const animation = useRef<Animation | null>(null), frame = useRef(0), finish = useRef(onFinish);
  finish.current = onFinish;
  useLayoutEffect(() => {
    const box = outer.current!, content = inner.current!;
    const target = collapsed ? 0 : content.getBoundingClientRect().height;
    const old = previous.current;
    previous.current = { collapsed, version, height: target };
    if (!old || (old.collapsed === collapsed && old.version === version)) return;
    const from = animation.current ? box.getBoundingClientRect().height : old.height;
    animation.current?.cancel();
    cancelAnimationFrame(frame.current);
    const adjustAnchor = () => {
      const anchor = anchorRef?.current, scroll = scrollRef?.current;
      if (anchor && scroll) scroll.scrollTop += anchor.element.getBoundingClientRect().top - anchor.top;
    };
    const complete = () => {
      animation.current = null;
      box.style.height = collapsed ? '0px' : '';
      box.style.overflow = collapsed ? 'hidden' : '';
      adjustAnchor();
      if (anchorRef) anchorRef.current = null;
      finish.current?.();
    };
    if (reducedMotion() || from === target) { complete(); return; }
    box.style.height = `${target}px`;
    box.style.overflow = 'hidden';
    const active = box.animate([{ height: `${from}px` }, { height: `${target}px` }], { duration: 200, easing: 'ease-out' });
    animation.current = active;
    const follow = () => { adjustAnchor(); if (animation.current) frame.current = requestAnimationFrame(follow); };
    if (anchorRef?.current) frame.current = requestAnimationFrame(follow);
    active.onfinish = complete;
  }, [collapsed, version, scrollRef, anchorRef]);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!animation.current && previous.current && !previous.current.collapsed) {
        const height = inner.current?.getBoundingClientRect().height || 0;
        if (height) previous.current.height = height;
      }
    });
    observer.observe(inner.current!);
    return () => { observer.disconnect(); animation.current?.cancel(); cancelAnimationFrame(frame.current); };
  }, []);
  return <div ref={outer} id={id} className={className} aria-hidden={collapsed || undefined} inert={collapsed || undefined} style={collapsed ? { height: 0, overflow: 'hidden' } : undefined}><div ref={inner} className="accordion-content">{children}</div></div>;
}

export function BackToTop({ scrollRef }: { scrollRef: RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false);
  const button = useRef<HTMLButtonElement>(null), frame = useRef(0), moving = useRef(false);
  useEffect(() => {
    const scroll = scrollRef.current!;
    const measure = () => setVisible(moving.current || (scroll.scrollHeight > scroll.clientHeight && scroll.scrollTop >= scroll.clientHeight));
    const cancel = () => {
      if (!moving.current) return;
      cancelAnimationFrame(frame.current); moving.current = false;
      if (scroll.scrollTop < scroll.clientHeight && document.activeElement === button.current) scroll.focus({ preventScroll: true });
      measure();
    };
    const key = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key) && !(event.target === button.current && event.key === ' ')) cancel();
    };
    scroll.addEventListener('scroll', measure, { passive: true });
    scroll.addEventListener('wheel', cancel, { passive: true });
    scroll.addEventListener('touchstart', cancel, { passive: true });
    const keyboardRegion = scroll.parentElement!;
    keyboardRegion.addEventListener('keydown', key);
    const observer = new ResizeObserver(measure); observer.observe(scroll); if (scroll.firstElementChild) observer.observe(scroll.firstElementChild);
    measure();
    return () => { cancelAnimationFrame(frame.current); moving.current = false; observer.disconnect(); scroll.removeEventListener('scroll', measure); scroll.removeEventListener('wheel', cancel); scroll.removeEventListener('touchstart', cancel); keyboardRegion.removeEventListener('keydown', key); };
  }, [scrollRef]);
  function goToTop() {
    if (moving.current) return;
    const scroll = scrollRef.current!, start = scroll.scrollTop, began = performance.now();
    const complete = () => { moving.current = false; scroll.scrollTop = 0; if (document.activeElement === button.current) scroll.focus({ preventScroll: true }); setVisible(false); };
    if (reducedMotion()) { complete(); return; }
    moving.current = true;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / 400);
      scroll.scrollTop = start * (1 - progress) ** 3;
      if (progress < 1) frame.current = requestAnimationFrame(tick); else complete();
    };
    frame.current = requestAnimationFrame(tick);
  }
  return visible ? <button ref={button} className="back-to-top" aria-label="맨 위로" onClick={goToTop}><ArrowUp/></button> : null;
}
