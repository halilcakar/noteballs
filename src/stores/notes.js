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
import { useStoreAuth } from "@/stores/auth";

let notesCollectionRef = null;
let notesCollectionQuery = null;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore({
  id: "storeNotes",
  state: () => ({
    notesLoaded: false,
    notes: [],
  }),
  actions: {
    init() {
      const authStore = useStoreAuth();
      notesCollectionRef = collection(db, "users", authStore.user.id, "notes");
      notesCollectionQuery = query(
        notesCollectionRef,
        orderBy("updatedAt", "desc")
      );
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((note) => {
          let data = note.data();
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
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot();
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
