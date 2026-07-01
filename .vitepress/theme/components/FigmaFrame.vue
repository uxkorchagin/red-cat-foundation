<template>
  <figure class="figma-frame">
    <div class="figma-frame__container" :style="{ aspectRatio: props.ratio }">
      <iframe
        :src="embedUrl"
        allowfullscreen
        loading="lazy"
        title="Figma design"
      />
    </div>
    <figcaption v-if="props.caption" class="figma-frame__caption">
      {{ props.caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Figma share URL — e.g. https://www.figma.com/file/... or https://www.figma.com/design/... */
  url: string
  caption?: string
  /** CSS aspect ratio, default "16/9" */
  ratio?: string
}>()

const embedUrl = computed(() => {
  // Convert share URL → embed URL
  // https://www.figma.com/file/ABC/name → https://www.figma.com/embed?embed_host=share&url=...
  const encoded = encodeURIComponent(props.url)
  return `https://www.figma.com/embed?embed_host=share&url=${encoded}`
})
</script>

<style scoped>
.figma-frame {
  margin: var(--spacing-32) 0;
}

.figma-frame__container {
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-graphite);
  box-shadow: var(--shadow-sm);
  background-color: var(--color-obsidian);
  position: relative;
}

.figma-frame__container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.figma-frame__caption {
  font-size: 12px;
  color: var(--color-slate);
  font-family: var(--font-berkeley-mono);
  text-align: center;
  margin-top: var(--spacing-8);
  letter-spacing: -0.01em;
}
</style>
