import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import FigmaFrame from './components/FigmaFrame.vue'
import StatusBadge from './components/StatusBadge.vue'
import PropertyTable from './components/PropertyTable.vue'
import './styles/vars.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register custom components — usable in any .md file
    app.component('FigmaFrame', FigmaFrame)
    app.component('StatusBadge', StatusBadge)
    app.component('PropertyTable', PropertyTable)
  },
} satisfies Theme
