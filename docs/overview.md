# 마치며..

## Vue는 어떤 점이 좋을까?
- 러닝 커브가 낮아 배우기 쉽다.
- 양방향 데이터 바인딩 가능하다.
- 단일 파일 컴포넌트로 HTML, CSS, JS를 한 파일에 직관적으로 작성할 수 있다.
- 적은 보일러플레이트로 코드를 간결하게 작성할 수 있다.
- 템플릿 컴파일 단계에서 자동 최적화를 해준다.

## 데모 프로젝트
### 프로젝트 개요
설문 등록 및 투표할 수 있는 설문/투표 시스템 프로젝트 입니다.<br>
관리자는 설문을 등록 및 관리 할 수 있으며, 사용자는 초대받은 설문에 투표할 수 있습니다.

### 주요 기능
- 설문 작성 및 등록
- 설문 목록 조회
- 설문 응답 제출
- 설문 결과 통계 조회

### 기술 스택 (예시)

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

### 개발 도구 (예시)
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

#### **Admin API**

```
POST   /api/admin/surveys              # 설문 생성 + 사용자 초대
GET    /api/admin/surveys              # 전체 설문 목록
GET    /api/admin/surveys/{id}         # 특정 설문 상세 + 결과
PUT    /api/admin/surveys/{id}/close   # 설문 마감
DELETE /api/admin/surveys/{id}         # 설문 삭제
GET    /api/admin/users                # 사용자 목록
```

#### **User API**

```
GET    /api/user/surveys               # 내가 초대받은 설문 목록
GET    /api/user/surveys/{id}          # 설문 상세
POST   /api/user/surveys/{id}/vote     # 투표하기
```

### 데이터베이스 스키마 (예시)

#### 1. User (사용자)

- id (PK)
- username
- email
- role (ADMIN, USER)

#### 2. Survey (설문)
- id (PK)
- title (설문 제목)
- description (설문 설명)
- admin_id (FK -> User)
- status (ACTIVE, CLOSED)
- created_at

#### 3. SurveyInvitation (설문 초대)
- id (PK)
- survey_id (FK -> Survey)
- user_id (FK -> User)
- status (PENDING, COMPLETED)

#### 4. Vote (투표/답변)
- id (PK)
- survey_id (FK -> Survey)
- user_id (FK -> User)
- choice (찬성/반대/기권 등)
- created_at

###  API 요청/응답 (예시)
1. 설문 생성 (Admin)
```
jsonPOST /api/admin/surveys
{
  "title": "점심 메뉴 투표",
  "description": "오늘 점심 뭐 먹을까요?",
  "invitedUserIds": [2, 3, 4, 5]
}
```
2. 내 설문 목록 조회 (User)
```
jsonGET /api/user/surveys
[
  {
    "id": 1,
    "title": "점심 메뉴 투표",
    "status": "ACTIVE",
    "invitationStatus": "PENDING",
    "createdAt": "2025-10-29"
  }
]
```
3. 투표하기 (User)
```
jsonPOST /api/user/surveys/1/vote
{
  "choice": "찬성"  // 또는 "반대", "기권"
}
```
4. 설문 결과 조회 (Admin)
```
jsonGET /api/admin/surveys/1
{
  "id": 1,
  "title": "점심 메뉴 투표",
  "status": "ACTIVE",
  "totalInvited": 4,
  "totalVoted": 3,
  "results": {
    "찬성": 2,
    "반대": 1,
    "기권": 0
  }
}
```
### 프로젝트 URL
[데모 프로젝트 들어가기]()