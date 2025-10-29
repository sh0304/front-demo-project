import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue.js",
  description: "",
  vite: {
    server: {
      port: 3001,
      host: true,
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        items: [
          { text: '소개', link: '/' },
          { text: 'ref와 reactive', link: '/reactive-system' },
          { text: 'computed와 watch', link: '/computed-watch' },
          { text: '템플릿 문법', link: '/template-syntax' },
          { text: 'Vanilla JS와 비교', link: '/vue-example' },
          { text: '생명주기', link: '/life-cycle' },
          { text: 'props와 emit', link: '/props-emit' },
          { text: '상태 관리', link: '/state-management' },
          { text: '마무리', link: '/overview' },
        ]
      }
    ],
  }
})
