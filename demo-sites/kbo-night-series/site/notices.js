(() => {
  "use strict";

  // Original list titles, dates and article bodies from the Figma notice variants.
  const articles = [
    {
      "title": "KBO NIGHT SERIES에 오신 것을 환영합니다",
      "date": "2026.11.17",
      "body": "KIA 타이거즈 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 광주 홈구장과 KIA의 팀 색상을 확인해 보세요."
    },
    {
      "title": "KIA 타이거즈 테마 둘러보기",
      "date": "2026.11.16",
      "body": "빨강과 건메탈을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 광주 야구장을 배경으로 사용합니다."
    },
    {
      "title": "라이브 카지노 화면 안내",
      "date": "2026.11.15",
      "body": "아래 메뉴에서 라이브 카지노를 선택하면 제공사 카드 여덟 장을 볼 수 있습니다.\n\n카드의 한글·영문 제공사명은 사진 아래에서 확인할 수 있습니다."
    },
    {
      "title": "슬롯게임 화면 안내",
      "date": "2026.11.14",
      "body": "슬롯게임 탭에는 제공사 카드 14장이 있습니다. 왼쪽의 인기·신규·데모 버튼으로 카테고리 선택 상태를 확인할 수 있습니다."
    },
    {
      "title": "쪽지와 문의 버튼 안내",
      "date": "2026.11.13",
      "body": "상단의 쪽지와 문의 버튼은 계정 관련 기능이 놓일 위치를 보여줍니다.\n\n이 화면은 디자인 미리보기이며 실제 메시지는 발송되지 않습니다."
    },
    {
      "title": "추천게임 카드 넘기기",
      "date": "2026.11.12",
      "body": "추천게임 화면에서 사진 양쪽의 화살표를 눌러 카드 순서를 바꿀 수 있습니다. 카드에 마우스를 올리면 강조 상태가 표시됩니다."
    },
    {
      "title": "화면 간 이동 방법",
      "date": "2026.11.11",
      "body": "하단의 네 메뉴는 모든 화면에서 같은 순서로 표시됩니다. 현재 보고 있는 화면의 메뉴에는 붉은 테두리가 나타납니다."
    },
    {
      "title": "제공사 이름 확인하기",
      "date": "2026.11.10",
      "body": "게임 사진 아래에 제공사 로고와 한글·영문 이름을 함께 표시했습니다. 비슷한 로고도 이름을 보고 구분할 수 있습니다."
    },
    {
      "title": "공지 목록에서 글 읽기",
      "date": "2026.11.09",
      "body": "공지 제목을 선택하면 같은 자리에서 본문이 열립니다. 상세의 ‘목록으로’ 버튼을 누르면 읽기 전 페이지로 돌아갑니다."
    },
    {
      "title": "공지 페이지 번호 사용하기",
      "date": "2026.11.08",
      "body": "한 페이지에는 공지 다섯 개가 표시됩니다. 목록 하단의 1~4번 버튼으로 다른 공지를 볼 수 있습니다."
    },
    {
      "title": "인기게임 카테고리",
      "date": "2026.11.07",
      "body": "슬롯게임 왼쪽의 첫 번째 버튼에서 인기게임의 선택 상태를 확인할 수 있습니다."
    },
    {
      "title": "신규게임 카테고리",
      "date": "2026.11.06",
      "body": "별 모양 아이콘이 있는 버튼은 신규게임을 나타냅니다. 이 미리보기에서는 버튼 선택 상태를 확인할 수 있습니다."
    },
    {
      "title": "데모게임 카테고리",
      "date": "2026.11.05",
      "body": "트로피 아이콘이 있는 버튼은 데모게임을 나타냅니다. 카드 실행 대신 카테고리의 시각 상태를 확인하는 화면입니다."
    },
    {
      "title": "계정 정보와 크레딧 표시",
      "date": "2026.11.04",
      "body": "상단 계정바에는 로그인 버튼과 보유 크레딧 영역이 있습니다. 로그인 전에는 잔액 대신 확인 안내가 표시됩니다."
    },
    {
      "title": "상단 안내 문구 읽기",
      "date": "2026.11.03",
      "body": "로고 오른쪽의 안내 영역에서 현재 스킨을 확인할 수 있습니다. 이 영역의 문구는 Figma에서 편집할 수 있습니다."
    },
    {
      "title": "광주 야구장 배경 안내",
      "date": "2026.11.02",
      "body": "공지사항은 광주-기아 챔피언스 필드를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
    },
    {
      "title": "슬롯 카드 이미지 안내",
      "date": "2026.11.01",
      "body": "카드 사진은 KIA의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
    },
    {
      "title": "카드 호버 상태 확인",
      "date": "2026.10.31",
      "body": "슬롯게임 카드에 마우스를 올리면 사진과 금속 프레임이 밝아집니다. 카드를 읽는 위치를 확인할 수 있도록 한 표시입니다."
    },
    {
      "title": "1920×1080 미리보기",
      "date": "2026.10.30",
      "body": "이 스킨은 1920×1080 프레임을 기준으로 제작했습니다. Figma 프레젠테이션에서 화면에 맞춤을 사용하면 전체 구성을 볼 수 있습니다."
    },
    {
      "title": "KIA 스킨 미리보기 범위",
      "date": "2026.10.29",
      "body": "이 페이지의 게시글과 버튼은 화면 흐름을 보여주기 위한 데모입니다. 실제 구단 또는 서비스의 운영 공지와는 별개입니다."
    }
  ];

  // Figma keeps the shared posts and changes the following fields for each club.
  const teamArticles = {
    "lg": {
      "1": {
        "body": "LG 트윈스 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 잠실 야구장과 LG의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "LG 트윈스 테마 둘러보기",
        "body": "빨강과 건메탈을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 잠실 야구장을 배경으로 사용합니다."
      },
      "16": {
        "title": "잠실 야구장 배경 안내",
        "body": "공지사항은 잠실 야구장를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 LG의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "LG 스킨 미리보기 범위"
      }
    },
    "doosan": {
      "1": {
        "body": "두산 베어스 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 잠실 야구장과 두산의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "두산 베어스 테마 둘러보기",
        "body": "짙은 남색과 건메탈을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 잠실 야구장을 배경으로 사용합니다."
      },
      "16": {
        "title": "잠실 야구장 배경 안내",
        "body": "공지사항은 잠실 야구장를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 두산의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "두산 스킨 미리보기 범위"
      }
    },
    "lotte": {
      "1": {
        "body": "롯데 자이언츠 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 사직야구장과 롯데의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "롯데 자이언츠 테마 둘러보기",
        "body": "다크 네이비와 코랄 레드을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 사직야구장을 배경으로 사용합니다."
      },
      "16": {
        "title": "사직야구장 배경 안내",
        "body": "공지사항은 사직야구장를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 롯데의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "롯데 스킨 미리보기 범위"
      }
    },
    "hanwha": {
      "1": {
        "body": "한화 이글스 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 대전 한화생명 볼파크과 한화의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "한화 이글스 테마 둘러보기",
        "body": "차콜과 이글스 오렌지을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 대전 한화생명 볼파크을 배경으로 사용합니다."
      },
      "16": {
        "title": "대전 한화생명 볼파크 배경 안내",
        "body": "공지사항은 대전 한화생명 볼파크를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 한화의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "한화 스킨 미리보기 범위"
      }
    },
    "samsung": {
      "1": {
        "body": "삼성 라이온즈 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 대구 삼성라이온즈파크과 삼성의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "삼성 라이온즈 테마 둘러보기",
        "body": "라이온즈 블루와 실버을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 라이온즈파크을 배경으로 사용합니다."
      },
      "16": {
        "title": "대구 삼성라이온즈파크 배경 안내",
        "body": "공지사항은 대구 삼성라이온즈파크를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 삼성의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "삼성 스킨 미리보기 범위"
      }
    },
    "ssg": {
      "1": {
        "body": "SSG 랜더스 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 인천 SSG랜더스필드과 SSG의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "SSG 랜더스 테마 둘러보기",
        "body": "스칼렛 레드와 아이보리을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 랜더스필드을 배경으로 사용합니다."
      },
      "16": {
        "title": "인천 SSG랜더스필드 배경 안내",
        "body": "공지사항은 인천 SSG랜더스필드를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 SSG의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "SSG 스킨 미리보기 범위"
      }
    },
    "kt": {
      "1": {
        "body": "KT 위즈 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 수원 KT위즈파크과 KT의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "KT 위즈 테마 둘러보기",
        "body": "블랙과 실버을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 수원 KT위즈파크을 배경으로 사용합니다."
      },
      "16": {
        "title": "수원 KT위즈파크 배경 안내",
        "body": "공지사항은 수원 KT위즈파크를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 KT의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "KT 스킨 미리보기 범위"
      }
    },
    "kiwoom": {
      "1": {
        "body": "키움 히어로즈 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 고척 스카이돔과 키움의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "키움 히어로즈 테마 둘러보기",
        "body": "버건디와 실버을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 고척 스카이돔을 배경으로 사용합니다."
      },
      "16": {
        "title": "고척 스카이돔 배경 안내",
        "body": "공지사항은 고척 스카이돔를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 키움의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "키움 스킨 미리보기 범위"
      }
    },
    "nc": {
      "1": {
        "body": "NC 다이노스 스킨을 살펴볼 수 있는 미리보기 화면입니다.\n\n하단 메뉴에서 추천게임, 라이브 카지노, 슬롯게임, 공지사항으로 이동할 수 있습니다. 각 화면에서 창원NC파크과 NC의 팀 색상을 확인해 보세요."
      },
      "2": {
        "title": "NC 다이노스 테마 둘러보기",
        "body": "네이비와 골드을 공통 색으로 사용했습니다. 추천게임은 야간 야구장과 선수 화보가 중심이고, 라이브 카지노는 응원석, 공지사항은 해 질 무렵의 창원NC파크을 배경으로 사용합니다."
      },
      "16": {
        "title": "창원NC파크 배경 안내",
        "body": "공지사항은 창원NC파크를 참고한 야간 이미지 위에 목록과 상세 패널을 배치했습니다."
      },
      "17": {
        "body": "카드 사진은 NC의 경기 장면과 야구 장비를 소재로 구성했습니다. 각 이미지와 제공사명은 별도 레이어입니다."
      },
      "20": {
        "title": "NC 스킨 미리보기 범위"
      }
    }
  };

  function element(tag, className, label) {
    const node = document.createElement(tag);
    node.className = className;
    if (label !== undefined) node.textContent = label;
    return node;
  }

  function button(className, label, onClick) {
    const node = element('button', className, label);
    node.type = 'button';
    node.addEventListener('click', onClick);
    return node;
  }

  function dateLabel(date) {
    const node = element('time', 'kbo-notice-date', date);
    node.dateTime = date.replaceAll('.', '-');
    return node;
  }

  function mount(board, team) {
    board.classList.add('kbo-notices');
    board.setAttribute('role', 'region');
    board.setAttribute('aria-label', '공지사항');
    const entries = articles.map((entry, index) => ({...entry, ...teamArticles[team]?.[index + 1]}));
    const pageSize = 5;
    let page = 1;

    function showList(focusIndex = null, focusPage = false) {
      const rows = element('div', 'kbo-notice-rows');
      const pager = element('nav', 'kbo-notice-pages');
      pager.setAttribute('aria-label', '공지사항 페이지');
      const start = (page - 1) * pageSize;
      for (const [offset, entry] of entries.slice(start, start + pageSize).entries()) {
        const row = button('kbo-notice-row', undefined, () => showArticle(start + offset));
        row.append(element('span', 'kbo-notice-title', entry.title), dateLabel(entry.date));
        rows.append(row);
      }
      for (let number = 1; number <= Math.ceil(entries.length / pageSize); number++) {
        const control = button('kbo-notice-page', String(number), () => {
          page = number;
          showList(null, true);
        });
        control.setAttribute('aria-label', number + '페이지');
        if (page === number) control.setAttribute('aria-current', 'page');
        pager.append(control);
      }
      board.replaceChildren(rows, pager);
      if (focusPage) pager.children[page - 1].focus({preventScroll: true});
      if (focusIndex !== null) rows.children[focusIndex - start].focus({preventScroll: true});
    }

    function showArticle(index) {
      const entry = entries[index];
      const article = element('article', 'kbo-notice-article');
      const back = button('kbo-notice-back', '목록으로', () => showList(index));
      article.append(
        back,
        element('h2', 'kbo-notice-heading', entry.title),
        dateLabel(entry.date),
        element('div', 'kbo-notice-divider'),
        element('p', 'kbo-notice-body', entry.body)
      );
      board.replaceChildren(article);
      back.focus({preventScroll: true});
    }

    showList();
  }

  window.KboNotices = {mount};
})();
