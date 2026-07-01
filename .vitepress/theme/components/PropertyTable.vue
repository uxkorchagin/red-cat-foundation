<template>
  <div class="prop-table">
    <table>
      <thead>
        <tr>
          <th>Свойство</th>
          <th>Тип</th>
          <th>По умолчанию</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props.properties" :key="prop.name">
          <td><code class="prop-name">{{ prop.name }}</code></td>
          <td><code class="prop-type">{{ prop.type }}</code></td>
          <td>
            <code v-if="prop.default !== undefined" class="prop-default">{{ prop.default }}</code>
            <span v-else class="prop-required">обязательный</span>
          </td>
          <td>{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Property {
  name: string
  type: string
  default?: string
  description: string
}

const props = defineProps<{
  properties: Property[]
}>()
</script>

<style scoped>
.prop-table {
  margin: var(--spacing-24) 0;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-caption);
}

thead tr {
  background-color: var(--color-obsidian);
  border-bottom: 1px solid var(--color-graphite);
}

thead th {
  font-size: 11px;
  font-weight: var(--fw-w590);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-slate);
  padding: var(--spacing-8) var(--spacing-16);
  text-align: left;
}

tbody tr {
  border-bottom: 1px solid var(--color-graphite);
}

tbody tr:last-child {
  border-bottom: none;
}

tbody td {
  padding: var(--spacing-12) var(--spacing-16);
  color: var(--color-fog);
  vertical-align: top;
}

.prop-name {
  color: var(--color-snow);
  font-family: var(--font-berkeley-mono);
  font-size: 12.5px;
  background: none;
  border: none;
  padding: 0;
}

.prop-type {
  color: var(--color-cyan);
  font-family: var(--font-berkeley-mono);
  font-size: 12px;
  background: none;
  border: none;
  padding: 0;
}

.prop-default {
  color: var(--color-indigo);
  font-family: var(--font-berkeley-mono);
  font-size: 12px;
  background: none;
  border: none;
  padding: 0;
}

.prop-required {
  color: var(--color-crimson);
  font-size: 12px;
  font-style: italic;
}
</style>
