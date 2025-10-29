# Computed와 Watch

## Computed (계산된 속성)
- 반응형 데이터를 기반으로 새로운 값을 계산하여 반환합니다.
- `getter` 함수를 인자로 받으며, 계산된 `ref`를 반환합니다.
- 값은 캐싱되며, 종속된 데이터가 변경될 때만 다시 계산됩니다.

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(1);
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <p>Original: {{ count }}</p>
  <p>Computed: {{ doubleCount }}</p>
</template>
```

Vue는 computed의 계산이 상태 값에 의존한다는 것을 알고 있으므로, 상태 값이 변경될 때 자동으로 업데이트합니다.
::: warning 주의사항
반응형 의존성이 없는 경우에는 추적하지 않아 업데이트 되지 않습니다.<br>
반응형 의존성이 있는 값으로 `computed`를 사용해야 합니다.
:::

---
### Computed 등장 이유
템플릿 내 표현식은 매우 편리하지만, 단순한 연산을 위한 것입니다.<br>
템플릿에 너무 많은 로직을 넣으면 템플릿이 복잡해지고 유지보수가 어려워질 수 있습니다.

**문제가 되는 경우:**

```vue
<script setup>
import { reactive } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - 고급 가이드',
    'Vue 3 - 기본 가이드',
    'Vue 4 - 미스터리'
  ]
})
</script>

<template>
  <p>출판한 책이 있습니까?</p>
  <!-- ❌ 템플릿이 복잡하고 재사용 어려움 -->
  <span>{{ author.books.length > 0 ? '예' : '아니오' }}</span>
</template>
```

**Computed 사용하는 경우:**

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - 고급 가이드',
    'Vue 3 - 기본 가이드',
    'Vue 4 - 미스터리'
  ]
})

// ✅ 계산된 속성
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? '예' : '아니오'
})
</script>

<template>
  <p>출판한 책이 있습니까?</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

**캐싱 예제:**
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

// Computed - 캐싱됨
const doubled = computed(() => {
  console.log('computed 실행!')
  return count.value * 2
})

// 메서드 - 캐싱 안됨
function doubledMethod() {
  console.log('메서드 실행!')
  return count.value * 2
}
</script>

<template>
  <div>
    <!-- computed는 한 번만 실행 -->
    <p>{{ doubled }}</p>
    <p>{{ doubled }}</p>
    <p>{{ doubled }}</p>
    
    <!-- 메서드는 세 번 실행 -->
    <p>{{ doubledMethod() }}</p>
    <p>{{ doubledMethod() }}</p>
    <p>{{ doubledMethod() }}</p>
  </div>
</template>
```
---
### Computed 사용법

**1. 순수 계산만 수행할 때 사용해야 합니다.**
- 순수 계산만 수행할 때 사용하며, 다른 상태를 변경해서는 안됩니다.
```javascript
const items = ref([])
const count = ref(5)

// ✅ 순수 계산만 수행
const doubled = computed(() => {
  return count.value * 2
})

// ✅ 필터링, 정렬 등 순수 계산
const filteredItems = computed(() => {
  return items.value.filter(item => item.active)
})
```

**2. 계산된 값을 변경하지 말아야 합니다.**
- Computed의 반환값은 **읽기 전용**으로 취급해야 하며, computed 값 변경을 하지 않은 것이 좋습니다.
```javascript
const numbers = ref([1, 2, 3])

const sortedNumbers = computed(() => {
  // ✅ 새 배열 반환 (원본 유지)
  return [...numbers.value].sort()
})

// ✅ 소스 상태를 변경
numbers.value.push(4)
```

## Watch(감시자)
- 하나 이상의 반응형 데이터 소스를 감시하고, 소스가 변경될 때 콜백 함수를 호출합니다.
- 상태를 다룰 때, 상태 변화에 반응하여 **부수 효과**(side effects)를 수행해야 하는 경우에 사용합니다.
  - DOM 수동 조작
  - API 호출
  - 로컬 스토리지 저장
  - 콘솔 로깅

### Watch 인자
```vue
watch(source, (newValue, oldValue) => {
   ........
});
```
- **첫 번째 인자: 감시 대상**
   - ref를 사용하는 반응형 데이터
   - reactive의 getter 함수를 사용하는 반응형 객체의 속성
   - 다중 소스의 배열
- **두 번째 인자: 콜백 함수로 감시하려는 소스가 변경될 때마다 실행**
   - 콜백 함수의 첫 번째 인자: 변경 이후의 값
   - 콜백 함수의 두 번째 인자: 변경 이전의 값


#### 1. 단일 ref

```javascript
const x = ref(0)

watch(x, (newX) => {
  console.log(`x는 ${newX}입니다`)
})
```

#### 2. Getter 함수

```javascript
const x = ref(0)
const y = ref(0)

watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`x + y의 합은: ${sum}`)
  }
)
```

#### 3. 여러 소스의 배열

```javascript
const x = ref(0)
const y = ref(0)

watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x는 ${newX}이고 y는 ${newY}입니다`)
})
```

#### 4. Reactive 객체의 속성 감시

```javascript
const obj = reactive({ count: 0 })

// ✅ getter 함수 사용
watch(
  () => obj.count,
  (count) => {
    console.log(`Count는: ${count}`)
  }
)
```
::: details 더보기
**ref**: 단일 값을 감시할 때는 직접 감시하거나 getter 함수로 감지하는 방식 모두 동일하게 작동합니다.

**reactive**: 객체를 감시할 때는 방식에 따라 동작이 달라집니다.
- 직접 감시: 객체 내부까지 자동으로 깊은 감지가 적용됩니다.
- getter 함수 사용: 객체의 참조만 감시하므로, 객체 전체가 교체될 때만 감지됩니다.
- 객체의 특정 속성을 감지하려면 getter 함수 내에서 해당 속성에 접근해야 합니다. 이렇게 해야 의존성이 등록되어 속성 변경을 감지할 수 있습니다.
:::
### Watch 옵션

#### 1. 즉시 실행 (Immediate)

기본적으로 watch는 값이 변경될 때만 콜백이 실행됩니다.<br>
`immediate: true`으로 설정하면 컴포넌트 마운트 시에 즉시 실행할 수 있습니다.

```javascript
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async (id) => {
    const response = await fetch(`/api/todos/${id}`)
    data.value = await response.json()
  },
  { immediate: true }  // 컴포넌트 마운트 시 즉시 실행
)
```

#### 2. 1회성 감시자 (Once)
`once: true`로 설정하면 단일 변경에만 실행시킬 수 있습니다.
```javascript
const source = ref(0)

watch(
  source,
  (newValue) => {
    console.log('한 번만 실행됨:', newValue)
  },
  { once: true }
)

source.value = 1  // 실행됨
source.value = 2  // 실행 안 됨
```

#### 3. 깊은 감시자 (Deep Watchers)
**자동 깊은 감시**
- Reactive 객체를 직접 watch하면 **자동으로 깊은 감시자**가 됩니다.

```javascript
const obj = reactive({ 
  count: 0,
  nested: {
    value: 10
  }
})

watch(obj, (newValue, oldValue) => {
  // 모든 중첩된 속성 변경에 대해 실행
  console.log('객체가 변경되었습니다')

})

obj.count++           // 실행됨
obj.nested.value++    // 실행됨
```

**명시적 깊은 감시**
- Getter 함수를 사용할 때는 `deep` 옵션을 명시해야 합니다.

```javascript
const state = reactive({
  user: {
    name: 'John',
    settings: {
      theme: 'dark'
    }
  }
})

// ❌ 객체가 교체될 때만 실행
watch(
  () => state.user,
  () => {
    console.log('user 객체가 교체되었습니다')
  }
)

// ✅ 중첩된 속성 변경도 감지
watch(
  () => state.user,
  (newValue, oldValue) => {
    console.log('user 또는 중첩 속성이 변경되었습니다')
  },
  { deep: true }
)

state.user.settings.theme = 'light'  // 이제 감지됨!
```

### Watch 사용법
```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('질문에는 보통 물음표가 들어 있습니다. ;-)')
const loading = ref(false)

// watch: 반응형 상태 변경 시 콜백 실행
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = '생각 중...'
    
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = '오류! API에 접근할 수 없습니다. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    예/아니오로 대답할 수 있는 질문을 해보세요:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

---

### watchEffect

`watchEffect`는 실행 중에 접근한 모든 반응성 종속성을 자동으로 추적하고, 즉시(마운트 시) 실행되며, 추적된 값들이 바뀔 때마다 다시 실행합니다.

**Watch vs watchEffect 비교:**

```javascript
const todoId = ref(1)
const data = ref(null)

// ❌ watch - 의존성 명시 + immediate 필요
watch(
  todoId,
  async () => {
    const response = await fetch(`/api/todos/${todoId.value}`)
    data.value = await response.json()
  },
  { immediate: true }
)

// ✅ watchEffect - 자동 추적 + 즉시 실행
watchEffect(async () => {
  const response = await fetch(`/api/todos/${todoId.value}`)
  data.value = await response.json()
})
```

**주요 차이점:**

| 특징 | watch | watchEffect |
|------|-------|-------------|
| 의존성 추적 | 명시적 (첫 번째 인자) | 자동 (사용된 값 추적) |
| 실행 시점 | 지연 (immediate 옵션 필요) | 즉시 실행 |
| 이전 값 접근 | ✅ 가능 | ❌ 불가능 |
| 정밀한 제어 | ✅ | ❌ |

## Computed vs Watch

### 언제 Computed와 Watch를 사용할까?

| 상황 | 사용 | 예제 |
|------|------|------|
| 다른 데이터로부터 값을 계산 | Computed | 필터링, 정렬, 포맷팅 |
| 복잡한 계산 캐싱 | Computed | 대용량 데이터 처리 |
| 데이터 변경 시 API 호출 | Watch | 검색어 변경 시 API 요청 |
| 데이터 변경 시 DOM 조작 | Watch | 스크롤 위치 조정 |
| 로컬 스토리지 저장 | Watch | 설정 변경 시 저장 |
