"use client";

import type { MouseEventHandler, ReactNode } from "react";

/** Reference structure. Reuse the application's existing IDs, state and actions. */
export type AldebaranHeaderItem = {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
};

export type AldebaranHeaderR3Props = {
  items: readonly AldebaranHeaderItem[];
  activeItemId: string;
  /** Existing notice control + handler; apply notice classes, remove visual icons. */
  notice: ReactNode;
  /** Existing guest/authenticated controls + handlers; apply account classes. */
  accountActions: ReactNode;
  brandHref: string;
  onBrandClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function AldebaranHeaderR3({
  items,
  activeItemId,
  notice,
  accountActions,
  brandHref,
  onBrandClick,
}: AldebaranHeaderR3Props) {
  return (
    <header className="ab-header3">
      <a
        className="ab-header3__brand"
        href={brandHref}
        onClick={onBrandClick}
        aria-label="ALDEBARAN 스포츠 홈"
      >
        <img
          className="ab-header3__wordmark"
          src="/assets/branding/aldebaran-wordmark.png"
          alt="ALDEBARAN"
          width={1101}
          height={120}
        />
      </a>

      <div className="ab-header3__notice">{notice}</div>

      <nav className="ab-header3__nav" aria-label="주요 카테고리">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="ab-header3__item"
            aria-pressed={activeItemId === item.id}
            disabled={item.disabled}
            onClick={item.onSelect}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="ab-header3__account">{accountActions}</div>
    </header>
  );
}
