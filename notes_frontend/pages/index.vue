<template>
  <div class="notes-list-page">
    <NotesList
      :notes="notes"
      :categories="categories"
      :currentCategory="currentCategory"
      @editNote="onEditNote"
      @deleteNote="onDeleteNote"
    />
    <NoteModal
      v-if="modalOpen"
      :note="modalNote"
      :categories="categories"
      @save="onSave"
      @close="closeModal"
      @addCategory="onAddCategory"
    />
    <button aria-label="Add Note" class="fab" @click="openModal(null)">
      <svg viewBox="0 0 20 20" class="icon-plus" width="24" height="24"><path fill="currentColor" d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 0 1 0-2h4V5a1 1 0 0 1 1-1Z"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NotesList from '~/components/NotesList.vue'
import NoteModal from '~/components/NoteModal.vue'
import { useNotesStore, Note } from '~/stores/notes'

const props = defineProps(['notes', 'categories', 'currentCategory', 'editNote', 'deleteNote'])

const notes = props.notes
const categories = props.categories
const currentCategory = props.currentCategory

const notesStore = useNotesStore()
const modalOpen = ref(false)
const modalNote = ref<Note | null>(null)

function openModal(note: Note | null) {
  modalNote.value = note ? { ...note } : null
  modalOpen.value = true
}
function closeModal() {
  modalOpen.value = false
  modalNote.value = null
}
function onSave(note: Note) {
  if (note.id) {
    notesStore.updateNote(note)
  } else {
    notesStore.addNote(note)
  }
  closeModal()
}
function onEditNote(note: Note) {
  openModal(note)
}
function onDeleteNote(id) {
  notesStore.deleteNote(id)
}
function onAddCategory(cat: string) {
  notesStore.addCategory(cat)
}
</script>

<style scoped>
.notes-list-page {
  position: relative;
  height: 100%;
}
.fab {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background: #4F46E5;
  color: #fff;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 16px 0 rgba(79,70,229, 0.16);
  width: 56px;
  height: 56px;
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}
.fab:hover {
  background: #F59E42;
}
.icon-plus {
  width: 32px;
  height: 32px;
}
</style>
