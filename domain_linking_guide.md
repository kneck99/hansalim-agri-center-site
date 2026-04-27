# hansalimnc.co.kr 도메인 연동 방법

사용자가 제공한 WHOIS 정보 기준:
- 도메인: `hansalimnc.co.kr`
- 등록대행자: 메가존(주) / HOSTING.KR
- 네임서버: `ns1.hosting.co.kr`, `ns2.hosting.co.kr`, `ns3.hosting.co.kr`, `ns4.hosting.co.kr`

즉, DNS는 보통 HOSTING.KR 또는 연결된 호스팅 관리자 화면에서 관리합니다.

---

## 1. 가장 쉬운 방식: 기존 서버에 폴더로 업로드
### 언제 쓰나
- 현재 메인 사이트가 이미 운영 중이고
- 서버/FTP/SFTP 접속 권한이 있을 때

### 방법
1. 현재 서버에서 웹 루트(public_html, www, htdocs 등)를 찾습니다.
2. `center` 같은 폴더를 만듭니다.
3. 이 패키지 전체를 업로드합니다.
4. `assets/config.js`를 실제 값으로 설정합니다.
5. 주소 확인:
   - `https://www.hansalimnc.co.kr/center/`

### 장점
- DNS 변경 없음
- 기존 사이트 유지 가능
- 가장 빠름

---

## 2. 권장 방식: 서브도메인으로 분리
### 예시 주소
- `center.hansalimnc.co.kr`
- `reserve.hansalimnc.co.kr`

### 언제 쓰나
- 기존 홈페이지와 별도 관리하고 싶을 때
- 새 사이트를 독립적으로 운영하고 싶을 때

### DNS 설정 개념
서브도메인을 새 서버로 연결합니다.

#### 같은 서버에 붙이는 경우
- 호스팅 관리자에서 서브도메인 생성
- 문서 루트를 새 폴더로 연결
- DNS는 자동 생성되거나 `A` 레코드 추가

#### 별도 서버/VPS에 붙이는 경우
- DNS에서 `A` 레코드 추가
  - 호스트: `center`
  - 값: 새 서버 IP
- 또는 `CNAME` 사용
  - 호스트: `center`
  - 값: 호스팅 제공 도메인

### 연결 후
- 웹서버(Nginx/Apache)에서 가상호스트 설정
- SSL 인증서 발급(Let's Encrypt 등)
- 패키지 업로드

---

## 3. 메인 도메인 자체를 새 사이트로 교체
### 언제 쓰나
- 기존 사이트를 완전히 새 사이트로 바꿀 때

### 방법
1. 새 서버를 준비
2. 사이트 전체 업로드
3. DNS `A` 레코드를 새 서버 IP로 변경
4. SSL 발급
5. 전파 확인

### 주의
- 기존 홈페이지가 즉시 교체됨
- 운영 리스크가 가장 큼

---

## 4. 실제 작업 순서 추천
### 추천 순서
1. 우선 새 사이트를 로컬/테스트 서버에서 확인
2. `assets/config.js` 설정 완료
3. 서브도메인 `center.hansalimnc.co.kr` 방식으로 먼저 오픈
4. 문제 없으면 메인 사이트 메뉴에서 링크 연결

이 방식이 가장 안전합니다.

---

## 5. Google 백엔드 연결 위치
- `reserveUrl` : 기존 Apps Script 웹앱 주소
- `calendarEmbedUrl` : Google Calendar 공개 iframe 주소
- `mapEmbedUrl` : Google Map iframe 주소

즉, 정적 사이트는 직접 제작/운영하고
백엔드는 Google을 그대로 사용하면 됩니다.

---

## 6. HOSTING.KR에서 확인할 것
- DNS 관리 메뉴 접근 가능 여부
- 서브도메인 생성 메뉴 유무
- 웹호스팅/서버 접속 정보
- SSL 설정 가능 여부
- FTP/SFTP 또는 파일매니저 제공 여부

---

## 7. 운영상 가장 현실적인 선택
### 1순위
`center.hansalimnc.co.kr` 서브도메인 + 이 패키지 업로드

### 2순위
기존 서버의 `/center/` 하위 폴더 운영

### 3순위
메인 도메인 전체 교체
