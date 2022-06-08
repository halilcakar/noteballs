import { defineStore } from "pinia";
import { db } from "@/config/firebase";

export const useStoreNotes = defineStore({
  id: "storeNotes",
  state: () => ({
    notes: [
      {
        id: "id1",
        content: "Lorem ipsum dolor sit amet consectetur.",
      },
      {
        id: "id2",
        content: "Some beatiful text here!",
      },
    ],
  }),
  actions: {
    addNote(content) {
      this.notes.unshift({
        id: "id" + new Date().getTime(),
        content,
      });
    },
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    updateNote(id, content) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        note.content = content;
      }
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => state.notes.find((note) => note.id === id)?.content;
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersOfAllNotes: (state) => {
      return state.notes.reduce((total, note) => {
        return total + note.content.length;
      }, 0);
    },
  },
});
