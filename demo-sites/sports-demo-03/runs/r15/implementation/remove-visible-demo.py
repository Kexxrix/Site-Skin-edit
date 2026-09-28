from pathlib import Path

root = Path(__file__).resolve().parents[3] / 'site'
replacements = {
    'MLB 데모': 'MLB',
    '예정 · 독립 합성 데모': '예정',
    '로컬 데모 · 실제 거래가 발생하지 않습니다.': '선택한 경기와 금액을 확인해 주세요.',
    ' · ALDEBARAN 스포츠는 로컬 데모 경기와 배당을 제공합니다.': '',
    '로컬 데모 배당 · ': '',
    '로컬 데모 · ': '',
    ' · 데모': '',
    '데모 계정 이용': '계정 이용',
    '로그인과 충전은 이 브라우저에서만 작동하는 데모입니다. ': '',
    '표시 일정은 데모 자료이며 실시간 중계를 의미하지 않습니다.': '표시 일정은 실시간 중계를 의미하지 않습니다.',
    '이 쪽지는 데모 안내이며 실제 수신 메시지가 아닙니다.': '슬립과 계정 이용 방법을 안내해 드립니다.',
    'ALDEBARAN 데모 계정': 'ALDEBARAN 계정',
    '별도의 개인정보 입력 없이 데모 계정으로 접속합니다.': '별도의 개인정보 입력 없이 접속합니다.',
    '데모 계정으로 접속': '접속하기',
    '데모 표시 이름': '표시 이름',
    '데모 로그인': '로그인',
    '공식 선수 명단이 없는 데모 자료이므로 선수 라인업은 제공하지 않습니다.': '공식 선수 명단이 없어 선수 라인업은 제공하지 않습니다.',
    '현재 데모에는 지급된 보너스와 정산된 손익이 없습니다.': '현재 지급된 보너스와 정산된 손익이 없습니다.',
    '이 화면은 만 19세 이상을 대상으로 한 스포츠 UI 데모입니다.': '만 19세 이상만 이용할 수 있습니다.',
    '데모 서비스의 범위': '서비스 이용 안내',
    '추가 배당은 로컬 데모 데이터입니다.': '배당은 저장된 자료를 기준으로 표시합니다.',
    '한 번의 데모 베팅은 ': '한 번의 베팅은 ',
    '일정·배당 데모 · 실시간 피드 없음': '일정·배당 · 실시간 피드 없음',
    '점수는 수집 기록 · 보완 통계·상황은 데모': '수집된 점수·통계·경기 상황',
    '데모 타임라인': '경기 타임라인',
}
changed = []
for path in [*root.glob('app/*.tsx'), *root.glob('app/*.ts'), root / 'app/prematch-r15.json', Path(__file__).with_name('build-snapshot.py')]:
    original = path.read_bytes().decode('utf-8')
    updated = original
    for before, after in replacements.items():
        updated = updated.replace(before, after)
    if updated != original:
        path.write_bytes(updated.encode('utf-8'))
        changed.append(str(path))
print('\n'.join(changed))
