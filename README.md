# 한살림농업살림센터 운영형 사이트 패키지

이 패키지는 Stitch 시안을 바탕으로 실제 운영 가능한 정적 사이트 구조로 다시 정리한 버전입니다.

## 폴더 구조
- `index.html` : 메인
- `pages/guide.html` : 이용안내
- `pages/intro.html` : 센터 소개
- `pages/floor.html` : 층별안내
- `pages/cafe-group.html` : 카페·식당 단체예약
- `pages/reserve.html` : 예약하기
- `pages/policy/*.html` : 정책/사업자정보
- `assets/styles.css` : 공통 스타일
- `assets/app.js` : 공통 스크립트
- `assets/config.sample.js` : 실제값 입력용 설정 파일

## 바로 수정해야 하는 값
`assets/config.sample.js`를 `assets/config.js`로 복사한 뒤 아래 값을 실제값으로 바꿉니다.
- `reserveUrl` : Apps Script 예약 웹앱 `/exec` 주소
- `calendarEmbedUrl` : 공개 Google Calendar embed 주소
- `mapEmbedUrl` : Google Maps embed 주소
- 사업자 정보

그리고 각 HTML 하단의 `config.sample.js`를 `config.js`로 바꿔주세요.

## 추천 운영 구조
### A. 기존 웹서버에 직접 업로드
- 현재 사이트 서버에 `/center/` 또는 `/farm-center/` 같은 폴더 생성
- 패키지 전체 업로드
- `https://www.hansalimnc.co.kr/center/` 형태로 운영

### B. 서브도메인 운영
- 예: `center.hansalimnc.co.kr`
- 별도 웹호스팅 또는 VPS에 업로드
- DNS에서 `A` 또는 `CNAME` 연결

## Google 백엔드 연결
프론트는 정적 사이트이고, 백엔드는 그대로 Google을 활용합니다.
- 예약 접수/조회/취소: Apps Script 웹앱
- 예약 DB: Google Sheets
- 예약현황: Google Calendar
- 알림: MailApp

## 초기 운영 권장 방식
1. 메인 페이지에서 예약현황 캘린더 노출
2. 예약 버튼으로 기존 Apps Script 웹앱 연결
3. 층별안내, 카페·식당, 정책 페이지는 이 정적 사이트에서 제공
4. 필요 시 나중에 예약 폼만 별도 프론트로 분리

## 도메인 연동 요약
현재 WHOIS 기준 네임서버가 `hosting.co.kr` 계열이라면 DNS 관리는 보통 HOSTING.KR/메가존 쪽에서 수행합니다.
- 루트 도메인 교체: 메인 사이트 전체 교체 시 사용
- 하위 폴더 운영: 서버 접속 권한만 있으면 DNS 변경 불필요
- 서브도메인 운영: DNS에서 `A` 또는 `CNAME` 추가 필요

## 주의
- 사업자등록번호, 대표자, 대표 유선번호는 실제 정보로 꼭 교체해야 합니다.
- 환불/약관/개인정보 문구는 최종 운영 기준으로 검토 후 반영해야 합니다.
- 사진은 현재 샘플 이미지가 포함되어 있으므로 고해상도 원본으로 교체하는 것이 좋습니다.
