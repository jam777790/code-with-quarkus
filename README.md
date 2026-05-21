# 🚀 Quarkus 프로젝트 실습 과제

<div align="center">
  <img src="https://img.shields.io/badge/Quarkus-4695EB?style=for-the-badge&logo=Quarkus&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
</div>

### 👤 작성자 정보
- **학번:** 20231018
- **이름:** 이환희

---

## 📅 주차별 수업 및 실습 내용

### 🔍 3주차: Quarkus 환경 구축 및 LOL 메인화면 기초
#### 🛠️ 실습 내용
1. **Quarkus 개발 환경 구축**
   - **정의:** 클라우드 네이티브 Java 프레임워크
   - **특징:** 빠른 시작 시간, 낮은 메모리 사용량 (Spring Boot 대비 약 10배 빠른 부팅)
   - **메모리 비교:** Quarkus + GraalVM (`13MB`) vs 전통 방식 (`140MB`)
   - **장단점:** 부팅이 매우 빠르나, 빌드 시간이 다소 길고 기존 프로젝트의 이전이 까다로움
2. **웹 기초 및 Bootstrap 맛보기**
   - **기본 태그:** 구조(`html`, `head`, `body`, `div`), 내용(`h1~h6`, `p`, `ul/li`), 메타(`meta`, `title`, `link`), 이미지(`img`)
   - **Bootstrap:** 외부 서버에서 CDN 방식으로 불러와 `container`, `row`, `col`, `card`, `navbar` 등의 클래스로 손쉽게 레이아웃 구성
   - **CSS 스타일링:** `background-color`, `color`, `border`, `transition`, `transform`, `:hover`, `height/width` 활용
3. **LOL 메인화면 페이지 만들기**
   - 검은 배경 + 보라색 테마 글자 구성
   - 챔피언 카드 배치 및 마우스 호버(Hover) 효과 추가
   - 상단 네비게이션 메뉴 구현

#### 💬 느낀점
> 처음 배우는 내용들이라 다소 생소했지만, 부트스트랩 기능이나 기본 태그 같은 요소들이 흥미로웠습니다. 코드를 통해 실제 웹 페이지가 뚝딱 구사되는 모습을 직접 눈으로 확인하니 무척 신기했습니다.

<div align="center">
  <img width="49%" alt="3주차 스크린샷 1" src="https://github.com/user-attachments/assets/70ff833a-5cb7-4618-ad88-42113963f3e2" />
  <img width="49%" alt="3주차 스크린샷 2" src="https://github.com/user-attachments/assets/f70c7964-5cd2-4994-a6cf-e2be2c7f7234" />
</div>

---

### 🔍 4주차: Bootstrap 심화 및 모달(Modal)창 구현
#### 🛠️ 실습 내용
1. **Bootstrap 5 활용 및 화면 배치**
   - 네비게이션 바 메뉴 및 그리드 시스템(Grid System)을 이용한 반응형 화면 배치
   - 카드, 버튼, 모달 디자인 요소 레이아웃 적용
2. **CSS 심화 및 모달창 구조 이해**
   - **선택자 우선순위:** `요소(Tag) < 클래스(.) < ID(#) < !important`
   - 외부 CSS 파일 연결 및 `Flexbox`를 활용한 정교한 화면 정렬
   - 하이퍼링크(`<a href="">`)와 이미지 경로(상대경로 vs 절대경로) 마스터

#### 💬 느낀점
> 레이아웃이 잡히며 홈페이지가 더욱 구체화되는 모습을 보니 뿌듯했습니다. 내가 원하는 이미지와 좋아하는 캐릭터를 직접 추가할 수 있어서 재미가 배가 되었습니다. 모달창 생성과 연결 부분이 처음엔 조금 어려웠지만, 차분히 구조를 파악하고 해결해 내서 아주 후련했습니다!

<div align="center">
  <img width="32%" alt="4주차 스크린샷 1" src="https://github.com/user-attachments/assets/ae5f8128-a7bc-4670-a18a-1b25d93f673e" />
  <img width="32%" alt="4주차 스크린샷 2" src="https://github.com/user-attachments/assets/40a07071-1077-4b21-b20d-7760a5a7aaf9" />
  <img width="32%" alt="4주차 스크린샷 3" src="https://github.com/user-attachments/assets/57d48dff-fb57-43dc-95bf-ecca244e8ed4" />
</div>

---

### 🔍 5주차: 모달창 상세화 및 다운로드 페이지 구현
#### 🛠️ 실습 내용
1. **모달창 컴포넌트 완성**
   - 챔피언 카드 클릭 시 상세 팝업(모달) 오픈 기능 구현
   - 모달 내부에 챔피언별 스킬 정보, 스토리(이야기) 데이터 동적 바인딩
2. **클라이언트 다운로드 페이지 구성**
   - 게임 설치 파일 다운로드 버튼 배치
   - OS별(Windows / Mac) 선택 옵션 제공
   - 깔끔한 마크업 테이블(Table)을 활용한 '컴퓨터 게임 구동 사양표' 작성

#### 💬 느낀점
> 기존에 만들어둔 틀을 활용해 여러 개의 모달창을 확장하고 나니 홈페이지가 훨씬 풍성하고 완성도 높게 느껴졌습니다. 텍스트뿐만 아니라 스킬 이미지까지 깔끔하게 매칭시켜 뿌듯했고, 실제 상용 게임의 다운로드 페이지와 유사한 퀄리티를 구현해 내서 기뻤습니다.

<div align="center">
  <img width="32%" alt="5주차 스크린샷 1" src="https://github.com/user-attachments/assets/a80261c7-350f-45a5-850d-3ef2035a5f83" />
  <img width="32%" alt="5주차 스크린샷 2" src="https://github.com/user-attachments/assets/ef599fee-c33e-4e8f-aa3b-381dc9aeda97" />
  <img width="32%" alt="5주차 스크린샷 3" src="https://github.com/user-attachments/assets/9c60064b-1663-4374-ac0e-ba476a0791dd" />
</div>

---

### 🔍 6주차: JavaScript 기초 및 동적 데이터 처리 (검색 연동)
#### 🛠️ 실습 내용
1. **JavaScript 핵심 기초 이론**
   - **역할:** HTML(구조), CSS(디자인) 위에 동적 기능(클릭, 애니메이션, 검색) 적용
   - **변수 선언:** `var`(재선언 가능, 지양 ❌), `let`(값 변경 가능, 재선언 불가), `const`(상수, 재선언/변경 불가, 권장 ✅)
   - **호이스팅(Hoisting):** 선언문이 최상단으로 끌어올려지는 현상. `var`는 `undefined`로 초기화되나 `let/const`는 TDZ 상태로 에러를 발생시켜 안전한 코딩 유도
2. **DOM(Document Object Model) 제어 및 이벤트**
   - `getElementById()`, `querySelector()` 등을 이용한 HTML 요소 탐색
   - `addEventListener`를 활용한 이벤트 처리 및 `preventDefault()`로 폼 제출 시 새로고침 방지
3. **LOL 데이터 필터링 및 구글 검색 연동**
   - 챔피언 및 뉴스 데이터를 **배열(Array)** 형태로 관리
   - JavaScript의 `filter()` 함수를 사용해 입력된 검색어와 일치하는 데이터 추출
   - `innerHTML` 속성을 활용해 필터링된 결과를 웹 화면에 동적으로 생성 및 카테고리 탭 전환 구현

#### 💬 느낀점
> 자바스크립트의 동작 원리나 호이스팅 같은 개념들이 한 번에 와닿지 않아서 조금 헤매기도 했습니다. 하지만 교수님의 설명을 기반으로 혼자 코드를 뜯어보며 고민한 덕분에 흐름을 이해할 수 있었습니다. 특히 검색창을 통해 실제 구글과 연동되는 메커니즘을 직접 구현해보니 신기하고 흥미로웠습니다.

<div align="center">
  <img width="42%" alt="6주차 스크린샷 1" src="https://github.com/user-attachments/assets/14f16865-0fa6-4450-9d66-b4587d605f81" />
  <img width="14%" alt="6주차 스크린샷 2" src="https://github.com/user-attachments/assets/faaab8cd-9980-460f-b808-345468f76b59" />
  <img width="42%" alt="6주차 스크린샷 3" src="https://github.com/user-attachments/assets/1e67fe4a-58ed-4728-9c71-22e416e17867" />
</div>

---

### 🔍 7주차: 내부 검색 기능 완성 및 종합 주차별 과제
#### 🛠️ 실습 내용
1. **인페이지(In-Page) 챔피언 검색창 구현**
   - **목표:** 검색창에 "이렐리아" 입력 시 해당하는 챔피언 카드만 화면에 필터링하기
   - 데이터 구조 정의 ➡️ `filter()` 매칭 ➡️ 카드를 dynamic HTML로 바인딩하여 렌더링
2. **주차별 과제 종합 수행**
   - 네비게이션 바 상단 좌측 로고 이미지 삽입 및 정렬 조절 (가운데 정렬)
   - 신규 챔피언 카드 추가 및 이에 대응하는 상세 설명 모달창 연동
   - 데이터 정의부 구조 고도화 및 실시간 동적 검색 기능 최종 검증

#### 💬 느낀점
> 데이터 정의 파트를 작성할 때 화면에 이미지가 깨지거나 불러와지지 않는 오류가 생겨서 난처했습니다. 다행히 교수님께 피드백을 구하고 코드 상의 사소한 에러를 잡아내며 해결할 수 있었습니다. 주차별 과제를 종합적으로 수행하면서 그동안 배웠던 전체적인 프론트엔드 코드 흐름을 복습하는 좋은 계기가 되었습니다.

<div align="center">
  <img width="32%" alt="7주차 스크린샷 1" src="https://github.com/user-attachments/assets/a7fc72e5-c1cb-4db3-86d7-64464ba45572" />
  <img width="32%" alt="7주차 스크셔 2" src="https://github.com/user-attachments/assets/e61a284f-e5fe-40aa-a681-ec8e2ba66b11" />
  <img width="32%" alt="7주차 스크린샷 3" src="https://github.com/user-attachments/assets/434aeda0-a434-44a4-88dc-bd804a6c7c31" />
  <br/><br/>
  <img width="49%" alt="7주차 스크린샷 4" src="https://github.com/user-attachments/assets/4e3b3420-cbad-4b9c-8872-d00669ad2c37" />
  <img width="49%" alt="7주차 스크린샷 5" src="https://github.com/user-attachments/assets/5a4add53-b9c0-476c-a746-122a1bd6ba9b" />
</div>

---

### 🔍 8주차: 중간고사
📝 **중간고사 필기 진행**

---

### 🔍 9주차: UI 테마 전환 및 Quarkus 데이터베이스(DB) 연동
#### 🛠️ 실습 내용
1. **다크 모드 / 라이트 모드 토글 기능**
   - 일반 배열(Array)과 객체 배열(Object Array)의 데이터 표현 차이 학습
   - HTML/CSS로 다크모드 스위치 버튼을 디자인하고 JavaScript로 스타일 전환 구현
2. **Quarkus 백엔드 - 데이터베이스 연동**
   - **개념:** DB(거대한 엑셀), 테이블(시트), 행/Row(챔피언 개별 정보), 열/Column(이름, 역할, 라인 속성)
   - `application.properties` 설정을 통한 자바 프로젝트와 데이터베이스 커넥션 풀 연결
   - **Entity 설계:** `Champion.java` 객체를 생성하여 데이터베이스 테이블 매핑
   - **Data Seeding:** `DataSeeder.java`로 초기 챔피언 더미 데이터 적재
   - **REST API 구현:** `ChampionResource.java` 엔드포인트를 구축하여 웹 브라우저에서 JSON 데이터를 정상적으로 조회 확인

#### 💬 느낀점
> 프론트엔드 디자인 영역을 넘어 백엔드 엔진인 Quarkus와 데이터베이스를 연결하는 과정이 매우 정교하게 맞아떨어져서 신기했습니다. 데이터가 소스코드 내부가 아닌 실제 DB 테이블로부터 연결된다는 것을 경험할 수 있어서 유익했습니다.

<div align="center">
  <img width="32%" alt="9주차 스크린샷 1" src="https://github.com/user-attachments/assets/e0a36b20-8b4c-4eb8-956d-43b327c70053" />
  <img width="32%" alt="9주차 스크린샷 2" src="https://github.com/user-attachments/assets/8442c119-9621-4669-8e0e-18e4a532c47e" />
  <img width="32%" alt="9주차 스크린샷 3" src="https://github.com/user-attachments/assets/de9e2711-ac93-4ad7-9b73-94517bd16112" />
  <br/><br/>
  <img width="49%" alt="9주차 스크린샷 4" src="https://github.com/user-attachments/assets/b36cdf55-0926-4652-bc56-9c9ab9c2e9b2" />
  <img width="49%" alt="9주차 스크린샷 5" src="https://github.com/user-attachments/assets/6b76ed1e-ba63-4492-985f-ae6d4cdbcf18" />
</div>

---

### 🔍 10주차: 인증 아키텍처 - 로그인 및 로그아웃 기능
#### 🛠️ 실습 내용
1. **사용자 로그인(Sign-In) 프로세스**
   - 세션(Session) 혹은 토큰 기반의 사용자 인증 메커니즘 분석 및 데이터 처리
2. **세션 만료 및 로그아웃(Sign-Out) 처리**
   - 인증 상태 초기화 및 안전한 화면 리다이렉션 라우팅 처리

#### 💬 느낀점
> 웹 서비스에서 가장 기본적이면서도 중요한 보안의 첫걸음인 로그인 시스템을 직접 다루어보며 웹 서버가 유저의 상태를 어떻게 기억하고 유지하는지 심도 있게 이해할 수 있었습니다.

---

### 🔍 11주차: 회원가입 기능 개발 및 패스워드 암호화 적용
#### 🛠️ 실습 내용
1. **회원가입(Sign-Up) 파이프라인 구축**
   - 유저 입력 폼 유효성 검증 및 데이터베이스 계정 객체 신규 데이터 인서트
2. **패스워드 해싱 및 단방향 암호화**
   - 데이터베이스 탈취 시에도 보안을 유지하기 위한 비밀번호 암호화 알고리즘 적용 실습

#### 💬 느낀점
> 비밀번호를 날것 그대로 저장하지 않고 암호화하여 안전하게 다루는 백엔드 보안 기술을 배우며 개발자로서 한 단계 더 성장한 느낌을 받았습니다. 회원가입부터 로그인까지의 전체 회원 관리를 완성하게 되어 매우 뿌듯합니다.

<div align="center">
  <img width="24%" alt="11주차 스크린샷 1" src="https://github.com/user-attachments/assets/fb8c6587-3b94-438d-bf03-5030b0b78475" />
  <img width="24%" alt="11주차 스크린샷 2" src="https://github.com/user-attachments/assets/6c731417-4e7d-4fe0-a99b-0af717230ae8" />
  <img width="24%" alt="11주차 스크린샷 3" src="https://github.com/user-attachments/assets/c23babf2-c773-40e6-a0f4-09ed19be3d0f" />
  <img width="24%" alt="11주차 스크린샷 4" src="https://github.com/user-attachments/assets/de5ce32f-b943-4915-90af-a37caaf8e983" />
</div>
