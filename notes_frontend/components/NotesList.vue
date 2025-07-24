<template>
  <div class="notes-list">
    <div v-if="notes.length === 0" class="empty">No notes found.</div>
    <div v-else>
      <ul class="card-list">
        <li v-for="note in notes" :key="note.id" class="note-card">
          <div class="card-head">
            <span class="note-category" :style="{ background: catColor(note.category) }">
              {{ note.category }}
            </span>
            <div class="card-actions">
              <button aria-label="Edit" class="icon-btn" @click="$emit('editNote', note)">
                <svg viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M14.85 3.85a1.2 1.2 0 0 1 1.7 1.7l-8.1 8.1-2.1.4.4-2.1 8.1-8.1zm1.4-1.43A3.2 3.2 0 0 0 12.39 2l-8.12 8.11a1 1 0 0 0-.25.46L2 15.27c-.09.47.34.9.8.8l4.7-.97a1 1 0 0 0 .46-.25L17.98 7.6a3.2 3.2 0 0 0-1.73-5.18z"/></svg>
              </button>
              <button aria-label="Delete" class="icon-btn red" @click="$emit('deleteNote', note.id)">
                <svg viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M6 2.5V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v.5h4a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h4zm2-1v1h4V1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5zm-2 4v9.5A2.5 2.5 0 0 0 8.5 17h3A2.5 2.5 0 0 0 14 14.5V5.5H6zm2.5.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 1 1-1 0v-7A.5.5 0 0 1 8.5 6zm3 0h1a.5.5 0 0 1 .5.5v7a.5.5 0 1 1-1 0v-7a.5.5 0 0 1 .5-.5z"/></svg>
              </button>
            </div>
          </div>
          <h3 class="note-title">{{ note.title }}</h3>
          <div class="note-content" v-html="renderContent(note.content)"></div>
          <div class="note-meta">
            <span>{{ new Date(note.updatedAt).toLocaleString() }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps(['notes', 'categories', 'currentCategory'])

function catColor(cat: string) {
  if (cat === 'Work') return '#4F46E5';
  if (cat === 'Personal') return '#F59E42';
  if (cat === 'Ideas') return '#64748B';
  if (cat === 'General') return '#cbd5e1';
  return '#e1e7ee';
}
function renderContent(content: string) {
  // Escape html, allow linebreaks
  // For real app, use a markdown renderer or sanitizer.
  return content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')
}
</script>

<style scoped>
.notes-list {
  padding: 2rem;
}
.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 2rem;
}
.note-card {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 8px 0 rgba(79,70,229,0.055), 0 0.5px 0 rgb(245 158 66 / 16%);
  padding: 1.3em 1.1em 1em 1.3em;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 170px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.note-category {
  padding: 0.2em 0.7em;
  border-radius: 999px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 400;
  margin-bottom: 0.25em;
}
.card-actions {
  display: flex;
  gap: 0.2em;
}
.icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 2px;
  border-radius: 6px;
  transition: background 0.15s;
}
.icon-btn:hover {
  background: #eef2ff;
}
.icon-btn.red:hover {
  background: #fee2e2;
}
.note-title {
  font-size: 1.15rem;
  margin: 0.25em 0 0.25em 0;
  color: #24292f;
}
.note-content {
  font-size: 1rem;
  margin-top: 0.3em;
  margin-bottom: 0.7em;
  color: #425466;
  word-break: break-word;
}
.note-meta {
  font-size: 0.74rem;
  color: #64748B;
  margin-top: auto;
  text-align: right;
}
.empty {
  color: #64748B;
  font-size: 1.1em;
  text-align: center;
  margin: 3em;
}
@media (max-width: 768px) {
  .notes-list { padding: 0.7rem; }
  .card-list { grid-template-columns: 1fr; gap: 1rem; }
}
</style>
