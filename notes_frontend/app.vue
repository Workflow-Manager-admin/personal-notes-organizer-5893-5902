<template>
  <div class="app-container">
    <Sidebar :categories="categories" :currentCategory="currentCategory" @selectCategory="onSelectCategory" class="sidebar" />
    <div class="main-area">
      <TopNav @search="onSearch" />
      <NuxtPage
        :notes="filteredNotes"
        :categories="categories"
        :currentCategory="currentCategory"
        :editNote="editNote"
        :deleteNote="deleteNote"
        @addNote="addNote"
        @updateNote="updateNote"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// App shell: topnav, sidebar, routing content area

import { ref, computed } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import TopNav from '~/components/TopNav.vue'
import { useNotesStore } from '~/stores/notes'

const notesStore = useNotesStore()
const categories = computed(() => notesStore.categories)
const notes = computed(() => notesStore.notes)

const currentCategory = ref<string | null>(null)
const searchTerm = ref('')

const filteredNotes = computed(() => {
  let filtered = notes.value
  if (currentCategory.value) {
    filtered = filtered.filter(note => note.category === currentCategory.value)
  }
  if (searchTerm.value) {
    filtered = filtered.filter(note =>
      note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  return filtered
})

function onSelectCategory(category: string | null) {
  currentCategory.value = category
}
function onSearch(term: string) {
  searchTerm.value = term
}

// Note CRUD proxy to store actions for global accessibility
function addNote(note) {
  notesStore.addNote(note)
}
function updateNote(note) {
  notesStore.updateNote(note)
}
function editNote(note) {
  notesStore.editNote(note)
}
function deleteNote(id) {
  notesStore.deleteNote(id)
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  background: #f8fafc;
  color: #24292f;
}
.sidebar {
  min-width: 224px;
  background: #fff;
  border-right: 1px solid #e1e7ee;
  height: 100vh;
  position: sticky;
  top: 0;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  .sidebar {
    position: relative;
    min-width: 100vw;
    width: 100vw;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e1e7ee;
  }
  .main-area {
    flex: 1 1;
  }
}
</style>
