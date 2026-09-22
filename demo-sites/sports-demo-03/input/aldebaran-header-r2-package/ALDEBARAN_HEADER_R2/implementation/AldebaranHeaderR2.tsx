"use client";

import type { MouseEventHandler, ReactNode } from "react";

/** Integration example: use the application's EXISTING state and handlers. */
export type AldebaranHeaderItem = {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
};

export type AldebaranHeaderR2Props = {
  items: readonly AldebaranHeaderItem[];
  activeItemId: string;
  /** Pass the existing notice control with its original handler. */
  notice: ReactNode;
  /** Pass the existing account state branch, including its handlers. */
  accountActions: ReactNode;
  brandHref: string;
  onBrandClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function AldebaranHeaderR2({
  items,
  activeItemId,
  notice,
  accountActions,
  brandHref,
  onBrandClick,
}: AldebaranHeaderR2Props) {
  return (
    <header className="ab-header2">
      <a
        className="ab-header2__brand"
        href={brandHref}
        onClick={onBrandClick}
        aria-label="ALDEBARAN 스포츠 홈"
      >
        <img
          className="ab-header2__emblem"
          src="/assets/branding/aldebaran-emblem.png"
          alt=""
          width={400}
          height={400}
        />
        <img
          className="ab-header2__wordmark"
          src="/assets/branding/aldebaran-wordmark.png"
          alt="ALDEBARAN"
          width={1101}
          height={120}
        />
      </a>

      <div className="ab-header2__utility">
        <div className="ab-header2__notice">{notice}</div>
        <div className="ab-header2__account">{accountActions}</div>
      </div>

      <nav className="ab-header2__nav" aria-label="주요 카테고리">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="ab-header2__item"
            aria-pressed={activeItemId === item.id}
            disabled={item.disabled}
            onClick={item.onSelect}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
