"use client";

export type SiriusBannerDestination = "slots" | "casino" | "events";

type Props = {
  onOpen: (destination: SiriusBannerDestination) => void;
};

const banners = [
  {
    destination: "slots",
    src: "/banners/sirius-r6/slots.png",
    eyebrow: "SIRIUS SLOTS",
    title: "슬롯 게임",
    description: "새로운 즐거움을 만나보세요",
    accessibleName: "슬롯 게임 열기",
  },
  {
    destination: "casino",
    src: "/banners/sirius-r6/casino.png",
    eyebrow: "LIVE CASINO",
    title: "라이브 카지노",
    description: "테이블의 열기를 가까이",
    accessibleName: "라이브 카지노 열기",
  },
  {
    destination: "events",
    src: "/banners/sirius-r6/events.png",
    eyebrow: "SIRIUS EVENTS",
    title: "이벤트",
    description: "시리우스의 소식을 만나보세요",
    accessibleName: "이벤트 열기",
  },
] as const;

export function SiriusLeftBanners({ onOpen }: Props) {
  return (
    <div className="sr6-banner-stack" role="group" aria-label="추천 서비스">
      {banners.map((banner, index) => (
        <button
          key={banner.destination}
          type="button"
          className="sr6-banner"
          aria-label={banner.accessibleName}
          onClick={() => onOpen(banner.destination)}
        >
          <img
            className="sr6-banner-image"
            src={banner.src}
            alt=""
            width={1672}
            height={941}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
          <span className="sr6-banner-copy">
            <span className="sr6-banner-eyebrow">{banner.eyebrow}</span>
            <span className="sr6-banner-title">{banner.title}</span>
            <span className="sr6-banner-description">{banner.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

