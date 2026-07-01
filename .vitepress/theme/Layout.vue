<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-before>
      <!-- Accent dot — lime status light in the nav -->
      <span class="nav-accent-dot" aria-hidden="true" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
</script>

<style scoped>
.nav-accent-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-acid-lime);
  margin-right: var(--spacing-8);
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(228, 242, 34, 0.6);
}
</style>
