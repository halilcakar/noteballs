<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote.trim()"
            class="button is-link has-background-success"
          >
            Add New Notes
          </button>
        </div>
      </div>
    </div>

    <Note
      @deleteClicked="deleteNote"
      v-for="note in notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";

const newNote = ref("");
const newNoteRef = ref(null);

const notes = ref([
  {
    id: "id1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus voluptate reiciendis, natus deleniti eius quis, esse eum, magni sit minus molestias nemo voluptates dolor? Autem omnis fugiat quaerat! Porro, harum!",
  },
  {
    id: "id2",
    content: "A Shot from the future!",
  },
]);

const addNote = () => {
  notes.value.unshift({
    id: "id" + new Date().getTime(),
    content: newNote.value,
  });

  newNote.value = "";

  newNoteRef.value.focus();
};

const deleteNote = (id) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};
</script>
