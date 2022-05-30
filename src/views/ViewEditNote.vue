<template>
  <div class="notes">
    <AddEditNote v-model="noteContent" ref="addEditNoteRef" bgColor="link" label="Edit Note"
      placeholder="Edit the note">
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Cancel
        </button>
        <button @click="updateNote" :disabled="!noteContent.trim()" class="button is-link has-background-link">
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStoreNotes } from "../stores/notes";
import AddEditNote from "@/components/Notes/AddEditNote.vue";

const storeNotes = useStoreNotes();
const route = useRoute();
const router = useRouter();

const addEditNoteRef = ref(null);
const noteContent = ref("");
noteContent.value = storeNotes.getNoteContent(route.params.id);

const updateNote = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  addEditNoteRef.value.focusTextarea();
  router.push('/')
};
</script>
