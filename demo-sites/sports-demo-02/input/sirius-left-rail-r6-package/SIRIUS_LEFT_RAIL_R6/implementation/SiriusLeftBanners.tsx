"use client";

// R6 참고 컴포넌트. 실제 메뉴/페이지 상태는 기존 SIRIUS의 핸들러를 연결합니다.
// 스타일은 sirius-left-rail-r6.css를 앱의 기존 CSS 진입점에서 불러오세요.
// 기존 왼쪽 레일 루트에 sirius-left-r6 클래스를 추가하세요.
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

// 경로 이동을 사용하는 현지 앱에서는 바깥 button만 기존 Link/anchor로 치환하세요.
// 임의 경로를 추정하지 말고 기존 헤더 메뉴의 대상/동작을 사용합니다.
