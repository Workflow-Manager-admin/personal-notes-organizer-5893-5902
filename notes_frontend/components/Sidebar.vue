<template>
  <nav class="sidebar-nav">
    <div class="nav-header">Categories</div>
    <ul>
      <li
        :class="['sidebar-item', { active: !currentCategory }]"
        @click="$emit('selectCategory', null)"
      >
        <span class="dot all"></span>
        All Notes
      </li>
      <li
        v-for="category in categories"
        :key="category"
        :class="['sidebar-item', { active: currentCategory === category }]"
        @click="$emit('selectCategory', category)"
      >
        <span class="dot" :style="{ background: dotColor(category) }"></span>
        {{ category }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps(['categories', 'currentCategory'])
const dotColor = (cat: string) => {
  // Give each category a stylized dot color based on name
  if (cat === 'Work') return '#4F46E5'
  if (cat === 'Personal') return '#F59E42'
  if (cat === 'Ideas') return '#64748B'
  if (cat === 'General') return '#cbd5e1'
  return '#e1e7ee'
}
</script>

<style scoped>
.sidebar-nav {
  padding: 2rem 1rem 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 400;
  min-height: 100vh;
}
.nav-header {
  font-weight: 600;
  text-transform: uppercase;
  color: #64748B;
  font-size: 0.875rem;
  padding-bottom: 0.7em;
  letter-spacing: 0.06em;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.7em 0;
  border-radius: 6px;
  margin-bottom: 0.1em;
  color: #4F46E5;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
  gap: 0.75em;
}
.sidebar-item.active, .sidebar-item:hover {
  background: #eef2ff;
  color: #F59E42;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5em;
  background: #e1e7ee;
  border: 1px solid #fff;
}
.dot.all {
  background: #fff;
  border: 1.5px solid #4F46E5;
}
@media (max-width: 768px) {
  .sidebar-nav {
    padding: 1rem 0.7rem;
    min-height: unset;
  }
}
</style>
