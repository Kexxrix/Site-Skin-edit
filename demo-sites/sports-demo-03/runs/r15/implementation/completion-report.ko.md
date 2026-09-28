# ALDEBARAN R15 완료 보고서

- 공개 버전: 17
- 소스: `7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23`
- 배포: `appgdep_6ab37b51a63c819182f809026a660a54`
- 주소: https://aldebaran.kexxadrix.chatgpt.site

## 최신 직접 피드백 반영

- 계정 우측 정렬 및 서비스 버튼 글자12px/아이콘16px 적용.
- 사용자 노출 금지 표현 제거, 야구 리그명 MLB로 통일.
- 팝업 버튼 WOG 그라데이션/광택 제거, 단색 주황색 적용.
- 복합 선택명의 결과·조건이 팀명 치환으로 사라지는 문제 수정.

## 검증

- 타입 검사와 빌드 통과. 최종 수정 후 다시 빌드해 소스와 배포 아카이브 일치.
- 61경기,4476마켓,11485선택 검증. 기존1664선택 ID·가격 유지.
- 115템플릿:73구현,40선수+1진출조건 제외,1별칭 중복 제거.
- 로컬8대표경기/10선택 경로, 전체61경기 N+,23폰트 역할 검증.
- 공개1920×1080 해외형·국내형·팝업 캡처와 계산 스타일 확인.

## 경기별 마켓 표

|경기 ID|종목|리그|프로필|패밀리|마켓|선택|N+ 일치|
|---|---|---|---|---:|---:|---:|---|
|record-401902644|basketball|NBA 프리시즌|standard|9|80|168|True|
|record-401881922|hockey|NHL 프리시즌|extended|23|79|192|True|
|record-401857190|basketball|WNBA|extended|9|115|238|True|
|record-401884790|soccer|분데스리가|extended|26|111|276|True|
|record-401879275|soccer|프리미어리그|extended|26|110|274|True|
|record-761815|soccer|MLS|standard|22|67|188|True|
|record-401876453|soccer|리그 1|standard|22|67|188|True|
|record-401857191|basketball|WNBA|compact|9|52|112|True|
|record-401857192|basketball|WNBA|standard|9|85|178|True|
|record-401857193|basketball|WNBA|extended|9|115|238|True|
|record-401857194|basketball|WNBA|compact|9|51|110|True|
|record-401881923|hockey|NHL 프리시즌|compact|23|52|138|True|
|record-401886427|hockey|NHL 프리시즌|extended|23|78|190|True|
|record-401878099|hockey|NHL 프리시즌|standard|23|64|162|True|
|record-401886258|hockey|NHL 프리시즌|extended|23|78|190|True|
|record-401879412|hockey|NHL 프리시즌|compact|23|51|136|True|
|record-401879652|hockey|NHL 프리시즌|standard|23|65|164|True|
|record-401879269|soccer|프리미어리그|compact|18|47|147|True|
|record-401879274|soccer|프리미어리그|standard|22|67|188|True|
|record-401878778|soccer|프리미어리그|extended|26|107|268|True|
|record-401879271|soccer|프리미어리그|standard|22|68|190|True|
|record-401879270|soccer|프리미어리그|compact|18|46|145|True|
|record-761818|soccer|MLS|standard|22|67|188|True|
|record-761819|soccer|MLS|extended|26|110|274|True|
|record-761816|soccer|MLS|extended|26|110|274|True|
|record-761817|soccer|MLS|compact|18|49|151|True|
|record-761822|soccer|MLS|standard|22|67|188|True|
|record-761820|soccer|MLS|extended|26|109|272|True|
|record-761821|soccer|MLS|compact|18|47|147|True|
|record-761823|soccer|MLS|extended|26|108|270|True|
|record-761824|soccer|MLS|compact|18|46|145|True|
|record-761826|soccer|MLS|extended|26|109|272|True|
|record-761827|soccer|MLS|compact|18|47|147|True|
|record-761825|soccer|MLS|standard|22|67|188|True|
|record-761828|soccer|MLS|standard|22|67|188|True|
|record-401884786|soccer|분데스리가|extended|26|110|274|True|
|record-401884787|soccer|분데스리가|compact|18|47|147|True|
|record-401884785|soccer|분데스리가|standard|22|67|188|True|
|record-401884784|soccer|분데스리가|compact|18|46|145|True|
|record-401884789|soccer|분데스리가|extended|26|110|274|True|
|record-401876451|soccer|리그 1|extended|26|111|276|True|
|record-401876457|soccer|리그 1|extended|26|108|270|True|
|record-401876455|soccer|리그 1|compact|18|47|147|True|
|record-401876454|soccer|리그 1|extended|26|108|270|True|
|record-401876450|soccer|리그 1|standard|22|67|188|True|
|aldebaran-r15-baseball-01|baseball|MLB|standard|15|65|156|True|
|aldebaran-r15-baseball-02|baseball|MLB|extended|14|102|262|True|
|aldebaran-r15-baseball-03|baseball|MLB|compact|13|26|74|True|
|aldebaran-r15-baseball-04|baseball|MLB|standard|16|67|190|True|
|aldebaran-r15-baseball-05|baseball|MLB|extended|15|102|234|True|
|aldebaran-r15-baseball-06|baseball|MLB|compact|11|25|70|True|
|aldebaran-r15-baseball-07|baseball|MLB|standard|15|65|156|True|
|aldebaran-r15-baseball-08|baseball|MLB|extended|15|102|234|True|
|aldebaran-r15-baseball-09|baseball|MLB|compact|13|26|74|True|
|aldebaran-r15-baseball-10|baseball|MLB|compact|13|26|74|True|
|aldebaran-r15-baseball-11|baseball|MLB|standard|16|67|190|True|
|aldebaran-r15-baseball-12|baseball|MLB|extended|15|102|234|True|
|aldebaran-r15-baseball-13|baseball|MLB|compact|14|29|110|True|
|aldebaran-r15-baseball-14|baseball|MLB|standard|15|65|156|True|
|aldebaran-r15-baseball-15|baseball|MLB|extended|15|102|234|True|
|aldebaran-r15-baseball-16|baseball|MLB|compact|13|26|74|True|

## 한계 및 보존 범위

- Static synthetic probability models and statistics; no live odds feed or verified player rosters.
- Joint markets use deterministic24000-sample models and simplified overtime conventions; not a settlement engine.
- Build passed with chunk-size warning over500kB, plugin timing advisory and unknown route classification notice.
- No full mobile or unrelated-page regression requested or run.
- No actual payment, settlement, wager submission or new account creation performed.
- No user visual approval claimed.
- Other sites and project operating4MD
- GitHub backup repository
- Existing account/storage IDs, selection rules, payment logic and original assets
- Header/rails/sportbar typography except explicitly requested account action size
