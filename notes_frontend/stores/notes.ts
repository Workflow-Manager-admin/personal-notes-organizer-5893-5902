import { defineStore } from 'pinia'

// Type definitions for notes and categories
export interface Note {
  id: string
  title: string
  content: string
  category: string
  createdAt: number
  updatedAt: number
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
    categories: ['General', 'Work', 'Ideas', 'Personal'] as string[],
    editingNoteId: null as string | null
  }),
  actions: {
    // PUBLIC_INTERFACE
    addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
      /** Add a new note to the store. */
      const newNote: Note = {
        ...note,
        id: Math.random().toString(36).substr(2, 9) + Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      this.notes.unshift(newNote)
    },
    // PUBLIC_INTERFACE
    updateNote(updatedNote: Note) {
      /** Update an existing note in the store. */
      const idx = this.notes.findIndex(n => n.id === updatedNote.id)
      if (idx !== -1) {
        this.notes[idx] = { ...updatedNote, updatedAt: Date.now() }
      }
    },
    // PUBLIC_INTERFACE
    deleteNote(id: string) {
      /** Delete a note by ID. */
      this.notes = this.notes.filter(note => note.id !== id)
    },
    // PUBLIC_INTERFACE
    editNote(note: Note) {
      /** Mark note as editing (for UI states). */
      this.editingNoteId = note.id
    },
    // PUBLIC_INTERFACE
    addCategory(category: string) {
      /** Add a new category if not exists. */
      if (!this.categories.includes(category)) {
        this.categories.push(category)
      }
    }
  }
})
