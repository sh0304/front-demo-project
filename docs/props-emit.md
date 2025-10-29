# Props와 Emit

## Props

Vue 컴포넌트는 props 선언을 통해 부모로부터 데이터를 받습니다.<br>
Props는 자식 속성과 부모 속성 간에 **하향식 단방향 데이터 바인딩**을 형성합니다.

### Props 선언 방법
`defineProps()`를 사용하여 props를 선언할 수 있습니다.

- `<script setup>`인 경우
```vue
<script setup>
const props = defineProps(['title'])
console.log(props.title)
</script>
```
- `<script setup>`이 아닌 경우
```vue
<script>
export default {
  props: ['title'],
  setup(props) {
    // setup()은 props를 첫 번째 인자로 받습니다.
    console.log(props.title)
  }
}
</script>
```

### Props 전달하기

#### 정적 Props
```vue
<BlogPost title="My journey with Vue" />
```

#### 동적 Props
```vue
<BlogPost :title="post.title" />
```

#### 객체로 여러 Props 바인딩
```vue
<script setup>
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
</script>

<template>
  <!-- v-bind로 객체의 모든 속성을 props로 전달 -->
  <BlogPost v-bind="post" />
  
  <!-- 위와 동일 -->
  <BlogPost :id="post.id" :title="post.title" />
</template>
```

### 단방향 데이터 흐름
부모 → 자식 방향으로만 데이터가 흐릅니다. <br>
자식 컴포넌트에서 prop을 직접 변경하려고 하면 Vue가 경고를 표시합니다.

```javascript
const props = defineProps(['foo'])

// ❌ 경고! props는 읽기 전용
props.foo = 'bar'
```

### Props 네이밍 컨벤션
- **선언 시**: camelCase 사용
```vue
<script setup>
defineProps({
  greetingMessage: String
})
</script>

<template>
  <span>{{ greetingMessage }}</span>
</template>
```
- **템플릿 전달 시**: kebab-case 사용 권장
```vue
<MyComponent greeting-message="hello" />
```

## Emit (이벤트)

### 이벤트 발생과 리스닝
컴포넌트는 내장된 `$emit` 메서드를 사용하여 템플릿 표현식(예: `v-on` 핸들러)에서 직접 커스텀 이벤트를 발생시킬 수 있습니다.

#### 기본 사용법
```vue
<!-- 자식 컴포넌트 -->
<template>
  <button @click="$emit('someEvent')">Click Me</button>
</template>
```

```vue
<!-- 부모 컴포넌트 -->
<template>
  <MyComponent @some-event="callback" />
</template>
```

### 이벤트 선언 방법
컴포넌트는 `defineEmits()`을 사용하여 발생시킬 이벤트를 명시적으로 선언할 수 있습니다.
```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

### 이벤트 인자 전달
이벤트와 함께 특정 값을 보낼 수도 있습니다.
#### 자식 컴포넌트
```vue
<template>
  <button @click="$emit('increaseBy', 1)">1만큼 증가</button>
</template>
```

#### 부모 컴포넌트
```vue
<template>
  <MyButton @increase-by="(n) => count += n" />
</template>
```

### 이벤트 네이밍 컨벤션
- **발생 시**: camelCase 사용
- **리스닝 시**: kebab-case 사용 권장
```vue
<!-- 자식: camelCase -->
<button @click="$emit('someEvent')">Click</button>

<!-- 부모: kebab-case -->
<MyComponent @some-event="callback" />
```

## Props vs Emit 비교

| 특징 | Props | Emit |
|------|-------|------|
| **방향** | 부모 → 자식 | 자식 → 부모 |
| **용도** | 데이터 전달 | 이벤트 통신 |
| **변경 가능성** | 읽기 전용 (단방향) | 발생만 가능 |
| **선언 방법** | `defineProps()` | `defineEmits()` |

### 사용 예시

```vue
<!-- 부모 컴포넌트 -->
<template>
  <ChildComponent 
    :message="parentMessage"
    @update-message="handleUpdate"
  />
</template>

<script setup>
import { ref } from 'vue'

const parentMessage = ref('Hello')

function handleUpdate(newMessage) {
  parentMessage.value = newMessage
}
</script>
```

```vue
<!-- 자식 컴포넌트 -->
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateMessage">Update</button>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String
})

const emit = defineEmits(['updateMessage'])

function updateMessage() {
  emit('updateMessage', 'Updated from child')
}
</script>
```