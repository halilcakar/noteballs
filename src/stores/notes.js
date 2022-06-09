import { defineStore } from "pinia";
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const notesCollectionRef = collection(db, "notes");
const notesCollectionQuery = query(
  notesCollectionRef,
  orderBy("updatedAt", "desc")
);

export const useStoreNotes = defineStore({
  id: "storeNotes",
  state: () => ({
    notesLoaded: false,
    notes: [],
  }),
  actions: {
    async getNotes() {
      this.notesLoaded = false;
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((note) => {
          let data = note.data();
          console.log(data.createdAt.toDate());
          notes.push({
            id: note.id,
            ...data,
            createdAt: new Date(data.createdAt?.toDate()),
            updatedAt: new Date(data.updatedAt?.toDate()),
          });
        });
        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    async addNote(content) {
      await addDoc(notesCollectionRef, {
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
        updatedAt: new Date(),
      });
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
      return state.notes.reduce(
        (total, note) => total + note.content.length,
        0
      );
    },
  },
});
