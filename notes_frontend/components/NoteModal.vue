<template>
  <div class="modal-backdrop" @click.self="close">
    <form class="modal" @submit.prevent="save">
      <h2>{{ editMode ? 'Edit Note' : 'Add Note' }}</h2>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="form.title" id="title" maxlength="80" required placeholder="Note title" />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea v-model="form.content" id="content" required rows="5" placeholder="Write your note here..." />
      </div>
      <div class="form-group-category">
        <label for="category">Category</label>
        <select id="category" v-model="form.category" required>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <input v-model="newCategory" placeholder="New Category" class="add-cat-input"/>
        <button class="add-cat-btn" type="button" @click="addNewCategory">+</button>
      </div>
      <div class="modal-actions">
        <button type="submit" class="btn-main">{{ editMode ? 'Update' : 'Save' }}</button>
        <button type="button" class="btn-secondary" @click="close">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import type { Note } from '~/stores/notes'

const props = defineProps({
  note: { type: Object as () => Note | null, default: null },
  categories: { type: Array as () => string[], required: true },
  editMode: { type: Boolean, default: false }
})
const emit = defineEmits(['save', 'close', 'addCategory'])

const form = ref({
  id: '',
  title: '',
  content: '',
  category: ''
})
const newCategory = ref('')
watch(() => props.note, (note) => {
  if (note) {
    form.value = { ...note }
  } else {
    form.value = {
      id: '',
      title: '',
      content: '',
      category: props.categories[0] || ''
    }
  }
}, { immediate: true })

function save() {
  if (!form.value.title || !form.value.content || !form.value.category) return
  emit('save', { ...form.value })
}
function close() {
  emit('close')
}
function addNewCategory() {
  if (newCategory.value.trim() && !props.categories.includes(newCategory.value.trim())) {
    emit('addCategory', newCategory.value.trim())
    form.value.category = newCategory.value.trim()
    newCategory.value = ''
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(36,42,47, 0.09);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 2rem 1.75rem;
  border-radius: 14px;
  box-shadow: 0 2px 36px 2px rgba(79,70,229,0.15);
  width: 98vw;
  max-width: 410px;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
h2 {
  margin-bottom: 0.4em;
  color: #4F46E5;
}
.form-group, .form-group-category {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  margin-bottom: 0.6em;
}
input, textarea, select {
  border: 1px solid #e1e7ee;
  border-radius: 7px;
  padding: 0.46em 0.99em;
  font-size: 1rem;
  background: #f8fafc;
}
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #4F46E5;
}
.form-group-category {
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
}
.add-cat-input {
  width: 100px;
}
.add-cat-btn {
  background: #F59E42;
  border: none;
  font-size: 1.35em;
  color: #fff;
  border-radius: 7px;
  width: 2.2em;
  height: 2.2em;
  cursor: pointer;
  margin-left: 0.2em;
  transition: background 0.17s;
}
.add-cat-btn:hover {
  background: #4F46E5;
}
.modal-actions {
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  margin-top: 0.3em;
}
.btn-main {
  background: #4F46E5;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.5em 1.4em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-main:hover {
  background: #F59E42;
}
.btn-secondary {
  background: #f3f5f9;
  border: none;
  border-radius: 7px;
  color: #64748B;
  padding: 0.5em 1.3em;
  font-weight: 500;
  cursor: pointer;
}
@media (max-width: 600px) {
  .modal { padding: 1.2em 0.3em; }
}
</style>
