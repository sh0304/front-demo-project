# 상태 관리

## 왜 상태 관리가 필요할까?

### 컴포넌트의 기본 구조

Vue 컴포넌트는 다음 세 가지로 구성됩니다.
```vue
<script setup>
import { ref } from 'vue'

// State (상태): 데이터
const count = ref(0)

// Action (액션): 상태를 변경하는 메서드
function increment() {
  count.value++
}
</script>

<!-- View (뷰): 상태를 보여주는 템플릿 -->
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">증가</button>
  </div>
</template>
```

이것이 **단방향 데이터 흐름**입니다.
```
State → View → Action → State
```

---

단일 컴포넌트에서는 문제가 없지만, 여러 컴포넌트가 동일한 상태를 공유할 때 문제가 발생합니다.

### 문제 1: 여러 뷰가 동일한 상태에 의존
```
할아버지 컴포넌트
  └─ 아버지 컴포넌트
      └─ 자식 컴포넌트
          └─ 손자 컴포넌트
```

- Props로 전달하면 **Prop Drilling** 발생 → 유지보수 어려움

### 문제 2: 서로 다른 뷰의 액션이 동일한 상태를 변경
```
컴포넌트A ─┐
          ├─→ 같은 데이터를 수정하려고 하는 경우
컴포넌트B ─┘
```

- 이벤트나 ref로 동기화 → 복잡하고 버그 발생

### 해결: 전역 상태 관리

공유 상태를 컴포넌트에서 분리하여 **전역에서 관리**합니다.

---

## 스토어(Store)란?

스토어(Store)는 전역 상태를 저장하고 관리하는 **중앙 저장소**입니다.

대표적으로 Vue 3에서 스토어 사용은 ⭐**Pinia**⭐를 권장합니다. 

### Pinia란?

Vue 3의 공식 상태관리 라이브러리이며, Vue 2와 Vue 3 모두 지원합니다.

### Vuex와의 비교

| 특징 | Vuex | Pinia |
|------|------------------|--------------|
| API 스타일 | Options API | Composition API |
| TypeScript | 복잡한 설정 필요 | 자동 타입 추론 |
| 모듈 구조 | 중첩된 모듈 | 평면 구조 (더 간단) |
| 코드량 | 많음 | 적음 |
| 개발 상태 | 유지보수 모드 | 개발 중 |

---

## Pinia 사용

### 설정
```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)  // Pinia 등록
app.mount('#app')
```

### 기본 사용법

**스토어 생성**
```javascript
// stores/counter.js - Pinia 스토어
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  return { count, increment }
})
```

**컴포넌트에서 사용**
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <button @click="counter.increment()">
    {{ counter.count }}
  </button>
</template>
```