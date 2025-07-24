<template>
  <nav class="topnav">
    <div class="brand">
      <svg class="icon" viewBox="0 0 24 24" width="30" height="30"><circle cx="12" cy="12" r="10" fill="#4F46E5"/><rect x="9" y="6" width="6" height="12" rx="2" fill="#F59E42"/><rect x="5" y="10" width="6" height="8" rx="2" fill="#64748B" /></svg>
      <span>My Notes</span>
    </div>
    <div class="searchbox">
      <input
        aria-label="Search notes"
        v-model="searchInput"
        type="search"
        placeholder="Search notes..."
        @input="emitSearch"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])
const searchInput = ref('')
function emitSearch() {
  emit('search', searchInput.value)
}
</script>

<style scoped>
.topnav {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e1e7ee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}
.brand {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #4F46E5;
  font-size: 1.25rem;
  gap: 0.5em;
}
.icon {
  margin-right: 0.3em;
}
.searchbox input {
  border: 1px solid #e1e7ee;
  border-radius: 6px;
  padding: 0.5em 1em;
  font-size: 1rem;
  width: 200px;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.2s;
}
.searchbox input:focus {
  border-color: #F59E42;
}
@media (max-width: 640px) {
  .topnav {
    padding: 0 1rem;
  }
  .brand span { display: none; }
  .searchbox input { width: 120px; }
}
</style>
