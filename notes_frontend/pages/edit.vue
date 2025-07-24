<template>
  <div class="edit-page-wrapper">
    <NoteModal
      :note="selectedNote"
      :categories="categories"
      editMode
      @save="onSave"
      @close="onClose"
      @addCategory="onAddCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '~/stores/notes'
import NoteModal from '~/components/NoteModal.vue'

const route = useRoute()
const router = useRouter()
const notesStore = useNotesStore()
const categories = notesStore.categories

const noteId = typeof route.query.id === 'string' ? route.query.id : ''
const selectedNote = notesStore.notes.find(n => n.id === noteId)

if (!selectedNote) {
  router.replace('/')
}

function onSave(note) {
  notesStore.updateNote(note)
  router.push('/')
}
function onClose() {
  router.push('/')
}
function onAddCategory(category) {
  notesStore.addCategory(category)
}
</script>

<style scoped>
.edit-page-wrapper { min-height: 100vh; background: #f8fafc; }
</style>
