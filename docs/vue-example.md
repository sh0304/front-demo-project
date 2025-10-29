# Vanilla JS와 비교

**동일한 기능을 구현한 화면:**

- [vanilla JS vs Vue.js 화면](examples/vanillaJs-vue-todo.html)

## 코드 비교

### 1️⃣ 상태 관리 (State Management)

**순수 JavaScript:**
```javascript
// 전역 변수로 상태 관리
let count = 0;
let todos = [];

// 상태 변경 시 수동으로 UI 업데이트 필요
vanillaIncrementBtn.addEventListener('click', () => {
    count++;
    vanillaCounter.textContent = count; // 수동 업데이트
});

vanillaTodoInput.addEventListener('input', (e) => {
    // 상태 변경 후 render() 호출 필요
    renderTodos(); // 수동 렌더링 호출
});
```

**Vue 3:**
```javascript
// 반응형 상태
const count = ref(0);
const todos = ref([]);
const newTodo = ref('');

// 자동 업데이트 (수동 호출 불필요)
const increment = () => count.value++;

// 템플릿에서 자동 바인딩
<input v-model="newTodo">
<div>{{ count }}</div>
```
- 상태가 변경되면 **자동으로 UI 업데이트**
- 이벤트 리스너 수동 등록 불필요
- v-model로 양방향 바인딩 한 줄로 해결

---

### 2️⃣ Computed 속성 (계산된 값)

**순수 JavaScript:**
```javascript
// 함수로 매번 계산해야 함
function getGreeting(name) {
    return name 
        ? `안녕하세요, ${name}님!` 
        : '안녕하세요!';
}

// 사용할 때마다 함수 호출 필요
vanillaInput.addEventListener('input', (e) => {
    const name = e.target.value;
    vanillaMessage.textContent = getGreeting(name);
});
```

**Vue 3:**
```javascript
// Computed 속성 - 의존성 자동 추적 및 캐싱
const name = ref('');

const greeting = computed(() => 
    name.value 
        ? `안녕하세요, ${name.value}님!` 
        : '안녕하세요!'
);

// 자동으로 재계산! (수동 호출 불필요)
// name이 변경되면 자동으로 다시 계산됨
```

```html
<!-- 템플릿에서 자동 반영 -->
<div>{{ greeting }}</div>
```

- computed는 **의존성을 자동으로 추적**하여 관련 데이터 변경 시 자동 재계산
- 결과가 **캐싱**되어 불필요한 재계산 방지
- 함수 호출 불필요

---

### 3️⃣ UI 렌더링

**순수 JavaScript:**
```javascript
function renderTodos() {
    // 1. 카운트 수동 업데이트
    vanillaTodoCount.textContent = `${todos.length}개 항목`;

    // 2. 기존 DOM 완전히 비우기
    vanillaTodoList.innerHTML = '';

    // 3. 조건부 렌더링 수동 처리
    if (todos.length === 0) {
        vanillaTodoList.style.display = 'none';
        vanillaNoTodos.style.display = 'block';
    } else {
        vanillaTodoList.style.display = 'flex';
        vanillaNoTodos.style.display = 'none';

        // 4. DOM 요소 하나하나 생성 및 추가
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            if (todo.completed) {
                todoItem.classList.add('completed');
            }

            const span = document.createElement('span');
            span.textContent = todo.text;
            span.addEventListener('click', () => {
                todo.completed = !todo.completed;
                renderTodos(); // 전체 재렌더링
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = '삭제';
            deleteBtn.addEventListener('click', () => {
                todos = todos.filter(t => t.id !== todo.id);
                renderTodos(); // 전체 재렌더링
            });

            todoItem.appendChild(span);
            todoItem.appendChild(deleteBtn);
            vanillaTodoList.appendChild(todoItem);
        });
    }
}
```

**Vue 3:**
```html
<!-- 카운트 - 자동 업데이트 -->
<div class="todo-count">
    {{ todos.length }}개 항목
</div>

<!-- 조건부 렌더링 - v-if -->
<div v-if="todos.length === 0" class="no-todos">
    할 일을 추가해보세요!
</div>

<!-- 리스트 렌더링 - v-for (자동으로 최적화) -->
<div v-else class="todo-list">
    <div 
        v-for="todo in todos" 
        :key="todo.id" 
        class="todo-item"
        :class="{ completed: todo.completed }">
        <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>
        <button class="btn-delete" @click="deleteTodo(todo.id)">삭제</button>
    </div>
</div>
```

- DOM 조작 코드 완전히 제거
- v-for가 자동으로 Virtual DOM 최적화
- 코드량 감소

---

### 4️⃣ 이벤트 처리

**순수 JavaScript:**
```javascript
// 각 DOM 요소마다 개별적으로 이벤트 리스너 등록
const vanillaIncrementBtn = document.getElementById('vanilla-increment');
const vanillaDecrementBtn = document.getElementById('vanilla-decrement');
const vanillaResetBtn = document.getElementById('vanilla-reset');
const vanillaTodoInput = document.getElementById('vanilla-todo-input');
const vanillaAddTodoBtn = document.getElementById('vanilla-add-todo');

vanillaIncrementBtn.addEventListener('click', () => {
    count++;
    vanillaCounter.textContent = count;
});

vanillaDecrementBtn.addEventListener('click', () => {
    count--;
    vanillaCounter.textContent = count;
});

vanillaResetBtn.addEventListener('click', () => {
    count = 0;
    vanillaCounter.textContent = count;
});

vanillaAddTodoBtn.addEventListener('click', addVanillaTodo);

vanillaTodoInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addVanillaTodo();
    }
});

// 렌더링 시 매번 이벤트 리스너 재등록
todos.forEach(todo => {
    const span = document.createElement('span');
    span.addEventListener('click', () => {
        todo.completed = !todo.completed;
        renderTodos(); // 이벤트 리스너 모두 재등록됨
    });
});
```

**Vue 3:**
```html
<!-- 템플릿에서 직접 이벤트 바인딩 -->
<button @click="increment">+1 증가</button>
<button @click="decrement">-1 감소</button>
<button @click="reset">초기화</button>

<input 
    v-model="newTodo" 
    @keyup.enter="addTodo"
    placeholder="할 일을 입력하세요">
<button @click="addTodo">추가</button>

<!-- v-for 내부에서도 이벤트 자동 관리 -->
<div v-for="todo in todos" :key="todo.id">
    <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>
    <button @click="deleteTodo(todo.id)">삭제</button>
</div>
```

```javascript
// 메서드 정의만 하면 됨
const increment = () => count.value++;
const decrement = () => count.value--;
const reset = () => count.value = 0;
const addTodo = () => { /* ... */ };
const toggleTodo = (id) => { /* ... */ };
const deleteTodo = (id) => { /* ... */ };
```

- **선언적 이벤트 바인딩** (@click, @keyup.enter)
- 이벤트 리스너 자동 관리 (등록/해제)
- 이벤트 위임 자동 처리

---

### 코드 복잡도 비교

| 구분 | 순수 JavaScript | Vue 3 |
|------|----------------|-------|
| **코드 줄 수** | ~130줄 | ~70줄 |
| **DOM 조작** | 수동 (getElementById, createElement, appendChild) | 선언적 (템플릿) |
| **이벤트 등록** | 수동 등록/해제 필요 | 자동 관리 |
| **상태 업데이트** | render() 수동 호출 | 자동 반응 |
| **조건부 렌더링** | if-else + style.display | v-if |
| **리스트 렌더링** | forEach + createElement | v-for |

---

::: details 전체 코드 비교

**순수 JavaScript:**
```javascript
// ========== DOM 요소 선택 ==========
const vanillaCounter = document.getElementById('vanilla-counter');
const vanillaInput = document.getElementById('vanilla-input');
const vanillaMessage = document.getElementById('vanilla-message');
const vanillaIncrementBtn = document.getElementById('vanilla-increment');
const vanillaDecrementBtn = document.getElementById('vanilla-decrement');
const vanillaResetBtn = document.getElementById('vanilla-reset');
const vanillaTodoInput = document.getElementById('vanilla-todo-input');
const vanillaAddTodoBtn = document.getElementById('vanilla-add-todo');
const vanillaTodoList = document.getElementById('vanilla-todo-list');
const vanillaTodoCount = document.getElementById('vanilla-todo-count');
const vanillaNoTodos = document.getElementById('vanilla-no-todos');

// ========== 상태 관리 ==========
let count = 0;
let todos = [];
let todoIdCounter = 1;

// ========== 이벤트 리스너 등록 ==========
vanillaIncrementBtn.addEventListener('click', () => {
    count++;
    vanillaCounter.textContent = count;
});

vanillaDecrementBtn.addEventListener('click', () => {
    count--;
    vanillaCounter.textContent = count;
});

vanillaResetBtn.addEventListener('click', () => {
    count = 0;
    vanillaCounter.textContent = count;
});

vanillaInput.addEventListener('input', (e) => {
    const name = e.target.value;
    vanillaMessage.textContent = name 
        ? `안녕하세요, ${name}님!` 
        : '안녕하세요!';
});

// ========== 할 일 목록 렌더링 ==========
function renderTodos() {
    vanillaTodoCount.textContent = `${todos.length}개 항목`;
    vanillaTodoList.innerHTML = '';

    if (todos.length === 0) {
        vanillaTodoList.style.display = 'none';
        vanillaNoTodos.style.display = 'block';
    } else {
        vanillaTodoList.style.display = 'flex';
        vanillaNoTodos.style.display = 'none';

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            if (todo.completed) {
                todoItem.classList.add('completed');
            }

            const span = document.createElement('span');
            span.textContent = todo.text;
            span.addEventListener('click', () => {
                todo.completed = !todo.completed;
                renderTodos();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = '삭제';
            deleteBtn.addEventListener('click', () => {
                todos = todos.filter(t => t.id !== todo.id);
                renderTodos();
            });

            todoItem.appendChild(span);
            todoItem.appendChild(deleteBtn);
            vanillaTodoList.appendChild(todoItem);
        });
    }
}

function addVanillaTodo() {
    const text = vanillaTodoInput.value.trim();
    if (text) {
        todos.push({
            id: todoIdCounter++,
            text: text,
            completed: false
        });
        vanillaTodoInput.value = '';
        renderTodos();
    }
}

vanillaAddTodoBtn.addEventListener('click', addVanillaTodo);
vanillaTodoInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addVanillaTodo();
    }
});

renderTodos();
```

**Vue 3:**
```javascript
const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // ========== 반응형 상태 ==========
        const count = ref(0);
        const name = ref('');
        const todos = ref([]);
        const newTodo = ref('');
        let todoIdCounter = 1;

        // ========== Computed 속성 ==========
        const greeting = computed(() => 
            name.value 
                ? `안녕하세요, ${name.value}님!` 
                : '안녕하세요!'
        );

        // ========== 메서드 ==========
        const increment = () => count.value++;
        const decrement = () => count.value--;
        const reset = () => count.value = 0;

        const addTodo = () => {
            if (newTodo.value.trim()) {
                todos.value.push({
                    id: todoIdCounter++,
                    text: newTodo.value,
                    completed: false
                });
                newTodo.value = '';
            }
        };

        const toggleTodo = (id) => {
            const todo = todos.value.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        };

        const deleteTodo = (id) => {
            todos.value = todos.value.filter(t => t.id !== id);
        };

        // ========== 반환 ==========
        return {
            count,
            name,
            greeting,
            increment,
            decrement,
            reset,
            todos,
            newTodo,
            addTodo,
            toggleTodo,
            deleteTodo
        };
    }
}).mount('#vue-app');
```

```html
<!-- Vue 템플릿 -->
<div id="vue-app">
    <!-- 카운터 -->
    <div>{{ count }}</div>
    
    <!-- 이름 입력 -->
    <input v-model="name" placeholder="당신의 이름">
    <div>{{ greeting }}</div>
    
    <!-- 버튼 -->
    <button @click="increment">+1 증가</button>
    <button @click="decrement">-1 감소</button>
    <button @click="reset">초기화</button>
    
    <!-- 할 일 목록 -->
    <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="할 일을 입력하세요">
    <button @click="addTodo">추가</button>
    
    <div>{{ todos.length }}개 항목</div>
    
    <div v-if="todos.length === 0">
        할 일을 추가해보세요!
    </div>
    
    <div v-else>
        <div 
            v-for="todo in todos" 
            :key="todo.id"
            :class="{ completed: todo.completed }">
            <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>
            <button @click="deleteTodo(todo.id)">삭제</button>
        </div>
    </div>
</div>
```
:::