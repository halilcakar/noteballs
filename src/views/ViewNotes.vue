<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef">
      <template #buttons>
        <button
          @click="addNote"
          :disabled="!newNote.trim()"
          class="button is-link has-background-success"
        >
          Add New Notes
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    />
    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />

      <div
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
        v-if="!storeNotes.notes.length"
      >
        No notes here yet..
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useStoreNotes } from "@/stores/notes";
import { useWatchCharacters } from "@/composables/useWatchCharacters";
import Note from "@/components/Notes/Note.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";

const newNote = ref("");
const addEditNoteRef = ref(null);

const storeNotes = useStoreNotes();

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

useWatchCharacters(newNote);
</script>
