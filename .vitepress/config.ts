import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { generateSidebar } from './plugins/sidebar'
import { generateNav } from './plugins/nav'

export default withMermaid(
  defineConfig({
    // ── Site metadata ──────────────────────────────────────────────
    title: 'Red Cat Foundation',
    description: 'Внутренняя инженерная платформа студии Red Cat. Единый источник истины для проектирования цифровых продуктов.',
    lang: 'ru-RU',

    // ── Source: корень репозитория ─────────────────────────────────
    srcDir: '.',
    srcExclude: [
      'node_modules/**',
      'preview/**',
      'scripts/**',
      'skills/**',
      'assets/**',
      'releases/**',
      'dist/**',
      'CLAUDE.md',
      'CODEOWNERS',
    ],
    outDir: './dist',
    cacheDir: './.vitepress/cache',

    // ── URL & appearance ───────────────────────────────────────────
    cleanUrls: true,
    appearance: false,

    // ── Head ───────────────────────────────────────────────────────
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        },
      ],
      ['meta', { name: 'theme-color', content: '#08090a' }],
    ],

    // ── Markdown ───────────────────────────────────────────────────
    markdown: {
      theme: { light: 'github-dark', dark: 'github-dark' },
      lineNumbers: true,
      container: {
        tipLabel: 'Совет',
        warningLabel: 'Предупреждение',
        dangerLabel: 'Важно',
        infoLabel: 'Информация',
        detailsLabel: 'Подробнее',
      },
    },

    // ── Mermaid ────────────────────────────────────────────────────
    mermaid: {
      theme: 'dark',
      themeVariables: {
        background: '#08090a',
        primaryColor: '#161718',
        primaryTextColor: '#f7f8f8',
        primaryBorderColor: '#23252a',
        lineColor: '#62666d',
        secondaryColor: '#0f1011',
        tertiaryColor: '#23252a',
        activationBorderColor: '#e4f222',
        activationBkgColor: '#23252a',
      },
    },

    // ── Navigation & sidebar (auto-generated) ──────────────────────
    themeConfig: {
      nav: generateNav(),
      sidebar: generateSidebar(),

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск в документации' },
            modal: {
              noResultsText: 'Ничего не найдено',
              resetButtonTitle: 'Сбросить',
              footer: { selectText: 'выбрать', navigateText: 'перейти', closeText: 'закрыть' },
            },
          },
        },
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/uxkorchagin/red-cat-foundation' },
      ],

      editLink: {
        pattern: 'https://github.com/uxkorchagin/red-cat-foundation/edit/main/:path',
        text: 'Редактировать на GitHub',
      },

      lastUpdated: {
        text: 'Обновлено',
        formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
      },

      docFooter: { prev: 'Назад', next: 'Далее' },
      outline: { label: 'На этой странице', level: [2, 3] },
      externalLinkIcon: true,
    },
  })
)
