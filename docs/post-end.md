# 마치며..

## Vue가 왜 좋은가?
- 러닝 커브가 낮아 배우기 쉽다.
- 양방향 데이터 바인딩 가능하다.
- 단일 파일 컴포넌트로 HTML, CSS, JS를 한 파일에 직관적으로 작성할 수 있다.
- 적은 보일러플레이트로 코드를 간결하게 작성할 수 있다.
- 템플릿 컴파일 단계에서 자동 최적화를 해준다.

## 데모 프로젝트
### 프로젝트 개요
게시판 형태로 설문을 등록하고 응답할 수 있는 설문조사 사이트 프로젝트 입니다.<br> 관리자는 설문을 등록 및 관리 할 수 있으며, 사용자는 초대받은 설문에 참여할 수 있습니다.

### 주요 기능
- 설문 작성 및 등록
- 설문 목록 조회
- 설문 응답 제출
- 설문 결과 통계 조회

### 기술 스택

#### Frontend
- **Vue.js 3** - 프론트엔드 프레임워크
- **Vue Router** - 라우팅 관리
- **Pinia** - 상태 관리
- **Axios** - HTTP 클라이언트
- **Tailwind CSS** / **Bootstrap** - UI 스타일링

#### Backend
- **Spring Boot 3.x** - 백엔드 프레임워크
- **Spring Data JPA** - ORM 및 데이터베이스 접근
- **H2** - 관계형 데이터베이스

### 개발 도구
- **Maven** / **Gradle** - 빌드 도구
- **Vite** - 프론트엔드 빌드 도구

### 프로젝트 구조 (예시)

```
survey-project/
├── frontend/              # Vue.js 프론트엔드
│   ├── src/
│   │   ├── components/   # 재사용 가능한 컴포넌트
│   │   ├── views/        # 페이지 컴포넌트
│   │   ├── router/       # 라우터 설정
│   │   ├── stores/       # Pinia 스토어
│   │   └── api/          # API 호출 함수
│   └── package.json
│
└── backend/              # Spring Boot 백엔드
    ├── src/main/java/
    │   └── com/example/survey/
    │       ├── controller/   # REST API 컨트롤러
    │       ├── service/      # 비즈니스 로직
    │       ├── repository/   # 데이터 액세스
    │       ├── entity/       # JPA 엔티티
    │       └── dto/          # 데이터 전송 객체
    └── pom.xml / build.gradle
```

### API 엔드포인트 (예시)

### 설문 관리
- `GET /api/surveys` - 설문 목록 조회
- `GET /api/surveys/{id}` - 설문 상세 조회
- `POST /api/surveys` - 설문 생성
- `PUT /api/surveys/{id}` - 설문 수정
- `DELETE /api/surveys/{id}` - 설문 삭제

### 응답 관리
- `POST /api/surveys/{id}/responses` - 설문 응답 제출
- `GET /api/surveys/{id}/results` - 설문 결과 조회

### 사용자 관리
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃

### 데이터베이스 스키마 (예시)

### surveys (설문)
- id, title, description, creator_id, created_at, updated_at

### questions (질문)
- id, survey_id, question_text, question_type, order_num

### options (선택지)
- id, question_id, option_text, order_num

### responses (응답)
- id, survey_id, user_id, submitted_at

### answers (답변)
- id, response_id, question_id, option_id, answer_text

### 프로젝트 URL
[데포 프로젝트]()