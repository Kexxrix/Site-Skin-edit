# ALDEBARAN 수정 보고서 — R12 이후 사용자 피드백

작성일: 2026-09-23 · 상태: 요청 7항목 구현·한정 검수·기존 주소 PUBLIC v13 배포 완료. 사용자 최종 시각 피드백 대기.

[공개 사이트 열기](https://aldebaran.kexxadrix.chatgpt.site/)

## 기획 담당자에게 전달할 변경 요약

중앙 경기 목록과 상세 마켓의 상단을 맞추고, 카드 선택 입력을 개선했다. VS 색상과 추가베팅 버튼은 사용자가 추가로 지정한 시안을 반영했다. 기존 한 페이지의 지정 부분만 수정했으며 별도의 R13 기획 패키지를 새로 만든 것은 아니다. v13은 실제 Sites 배포 버전이다.

| 변경 항목 | 이전 | 최종 반영 및 확인 |
|---|---|---|
| 종목바 아래 간격 | 아래 영역과 외부 여백 없음 | 종목바 외곽 하단부터 아래 양쪽 영역까지 8px |
| 왼쪽 경기 목록 패딩 | 상·우·하·좌 모두 10px | 상단 0px, 좌우·하단 10px |
| 국가·리그 아코디언 제목 | 왼쪽 실측 36px, 오른쪽 경기 제목 39px | 왼쪽도 39px. 좌우 제목 상단·하단 정렬 |
| 팀 사이 VS | 주황 #FF641F | 사용자 최종 지정 #797979. 다른 텍스트색 유지 |
| 일반 UI 텍스트 드래그 | 글자가 선택됨 | 일반 UI 선택 방지. 입력·텍스트영역·편집 가능 요소는 선택·편집 허용 |
| 경기 카드 클릭 범위 | 팀 행 등에만 경기 보기 처리가 연결되어 날짜·리그·여백은 반응하지 않음 | 추가베팅·배당 버튼 외 카드 전체에서 기존 경기 선택과 오른쪽 상세 전환 |
| 추가베팅 표시 버튼 | 고정 폭 54px, 높이 24px | 내용에 맞춘 작은 버튼. 한 자리 약27.36×24px, 두 자리 약33.11×24px |

최종 VS는 #797979다. 진행 중 임시로 고려했던 #B7B7B7은 적용 기준에서 폐기했다. 버튼 폭 54px 보존 조건도 사용자의 후속 축소 지시로 대체했다. 노랑 #F1B000, 어두운 글자 #171717, 우측 정렬, 모서리 5px 및 기존 추가베팅 동작은 유지했다.

## 정렬과 클릭 처리의 구체적 결과

1920×1080, 100%에서 좌우 제목 행은 모두 y157~196으로 높이39px이며, 텍스트 상단은 y167로 같다. 왼쪽12px·오른쪽14px라는 기존 폰트 규격을 보존했기 때문에 line-box 중심 차이0.25px는 남아 있다. 오른쪽 마켓의 내부 패딩·필터·카드·색상·상대 배치를 변경하지 않았다. 공통 외부 여백8px를 확보하면서 아래 스크롤 영역의 가용 높이는8px 줄었다.

텍스트 드래그와 카드 클릭 범위는 별개 원인이었다. 텍스트에는 ALDEBARAN 범위의 user-select 규칙을 적용했고, 팀 엠블럼의 기본 이미지 드래그도 막았다. 카드에는 버튼이 아닌 영역만 기존 inspect 처리로 연결했다. 기존 팀 행의 키보드 버튼은 유지한다. 배당 버튼이 부모 카드 클릭으로 다시 처리되어 상세나 스크롤을 초기화하지 않도록 제외했다.

카드 전체 클릭으로 상세를 바꾸는 동작은 원래 inspected 경기와 오른쪽 상세가 존재하는 해외형에 적용했다. 국내형에는 새 상세 패널이나 선택 상태를 추가하지 않았고 기존 공동 목록을 유지했다.

## 변경 파일과 보존 범위

- [aldebaran-wog-r5.css](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.css): 간격·패딩·제목 높이·VS 색·텍스트 선택·추가베팅 크기.
- [aldebaran-wog-r5.tsx](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.tsx): 카드 비버튼 영역 클릭과 엠블럼 드래그 방지. 기존 버튼·키보드 처리 보존.
- 앱 diff는 2파일, 9줄 추가·7줄 삭제다. AGENTS·STATE·DESIGN_SPEC·DECISIONS 및 본 보고서는 작업 기록으로 갱신했다.

1920 고정 틀, 기존 폰트·이미지·헤더·배너·종목바 버튼, VS 외 R12 색상, 경기/배당/기준값 데이터, 슬립·저장 상태·이력, 해외형 독립 스크롤과 국내형 공동 스크롤을 보존했다. MERCURY·SIRIUS·타이탄과 GitHub 백업은 변경하지 않았다.

## 검증 결과

| 확인 | 결과와 범위 |
|---|---|
| 타입 검사 | node node_modules/typescript/bin/tsc --noEmit --incremental false — 1회, exit0 |
| 프로덕션 빌드 | 기존 npm run build — 1회, exit0 |
| 레이아웃·색상 | 로컬 및 공개1920에서 8px/패딩/39px/정렬/VS #797979 확인 |
| 텍스트 선택 | 실제 마우스 드래그 후 일반 UI 선택문자0. 대표 검색 입력은 선택·수정 후 원래 빈 값으로 복원 |
| 경기 선택 | 날짜·리그명·팀 엠블럼·기준값·여백 및 기존 키보드 경로에서 경기 전환 확인 |
| 버튼 분리 | 배당1회 토글·해제 중 기존 상세 경기와 스크롤266 유지. 추가베팅 독립동작 확인 |
| 기존 동작 | 아코디언 접기·복원, 해외형 독립/국내형 공동 스크롤 확인 |
| 공개 반영 | PUBLIC v13 성공, 국내·해외 모드 전환과 최종 화면 확인. 상세 기능 검사는 같은 소스의 로컬 결과를 재사용 |

기존 chunk-size/plugin-timing 경고와 vinext route classification unknown은 남아 있으며 이번 변경의 빌드 실패는 없다. 모든 입력필드 개별 검사, 전체 회귀, 다른 화면 폭, 인증·계정 생성·결제·베팅 제출은 실행하지 않았다. 기술 검증 통과는 사용자 미감 승인과 구분한다.

## 배포와 작업 상태

- 대상: 기존 ALDEBARAN 공개 주소, PUBLIC v12 → v13.
- 소스: c97d42c9630670780b26c2ba00541a4e7e69bd83 → 74da3a356c7697d42641997a94025f0dccfef01b. 작업 트리 clean 확인.
- 배포 성공: 2026-09-23 11:36:02 KST.
- Sites 프로젝트: appgprj_6ab0f3255cdc819180a427bf6d0846f4.
- 저장 버전: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_89a515dea4e08191bf2519a1b4b75bc7.
- 배포: appgdep_6ab33afd474081918dab9f113b0eac72, succeeded.

진행 중 기존 Sites helper 폴더가 사라진 것이 확인됐다. 원인은 확인하지 못했다. 기존 R12 배포 파일 구조와 현재 빌드 출력을 대조해 Sites 정식 소스 업로드·버전 저장·배포 기능으로 완료했다. 재설치·새 의존성·원격 빌드 fallback·다른 서비스 전환은 하지 않았다. 로컬 미리보기 http://localhost:5303/ 는 유지했다.

요청 항목의 구현 미완료는 없다. 남은 판단은 사용자의 최종 시각 승인이다. 추가 보완이나 다음 사이클은 피드백 후 진행한다.

## 최종 화면과 증거

- [해외형 공개 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/post-r12-alignment-20260923/public/european-1920.jpg)
- [국내형 공개 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/post-r12-alignment-20260923/public/domestic-1920.jpg)
- [구현·배포 완료 기록](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/post-r12-alignment-20260923/implementation/completion.json)
- [한정 동작 검증](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/post-r12-alignment-20260923/implementation/evidence.json)
- [공개 화면 확인](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/post-r12-alignment-20260923/public/browser-confirmation.json)
- [최신 STATE](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/STATE.md)

두 최종 공개 이미지는 1920×1080 JPEG다. 캡처 파일·크기·SHA-256은 public/image-validation.json에 기록했다. 기존 공개 탭은 유지했으며 공개 화면의 기존 저장 상태와 로컬 검사용 초기 상태는 구분했다.