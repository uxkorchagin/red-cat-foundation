<template>
  <span class="status-badge" :class="`status-badge--${props.status}`">
    <span class="status-badge__dot" />
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Status = 'stable' | 'beta' | 'deprecated' | 'new' | 'wip'

const props = defineProps<{
  status: Status
  label?: string
}>()

const label = computed(() => props.label ?? props.status)
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: var(--radius-badges);
  font-size: 11px;
  font-weight: var(--fw-w510);
  font-family: var(--font-inter-variable);
  vertical-align: middle;
  white-space: nowrap;
  line-height: 1.5;
}

.status-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Stable */
.status-badge--stable {
  background-color: rgba(39, 166, 68, 0.1);
  color: var(--color-emerald);
}
.status-badge--stable .status-badge__dot {
  background-color: var(--color-emerald);
}

/* Beta */
.status-badge--beta {
  background-color: rgba(94, 106, 210, 0.1);
  color: var(--color-indigo);
}
.status-badge--beta .status-badge__dot {
  background-color: var(--color-indigo);
}

/* New */
.status-badge--new {
  background-color: rgba(228, 242, 34, 0.08);
  color: var(--color-acid-lime);
}
.status-badge--new .status-badge__dot {
  background-color: var(--color-acid-lime);
}

/* WIP */
.status-badge--wip {
  background-color: rgba(2, 184, 204, 0.08);
  color: var(--color-cyan);
}
.status-badge--wip .status-badge__dot {
  background-color: var(--color-cyan);
}

/* Deprecated */
.status-badge--deprecated {
  background-color: rgba(235, 87, 87, 0.08);
  color: var(--color-crimson);
}
.status-badge--deprecated .status-badge__dot {
  background-color: var(--color-crimson);
}
</style>
