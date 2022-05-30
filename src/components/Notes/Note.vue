<template>
  <div class="card mb-4">
    <main class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small> {{ characterLength }} </small>
        </div>
      </div>
    </main>
    <footer class="card-footer">
      <RouterLink :to="`/edit/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a @click.prevent="handleDelete" href="#" class="card-footer-item">Delete</a>
    </footer>
    <ModalDeleteNote :noteId="note.id" v-if="modals.deleteNote" v-model="modals.deleteNote" />
  </div>
</template>

<script setup>
import { reactive, computed } from "@vue/reactivity";
import { useStoreNotes } from "@/stores/notes";
import ModalDeleteNote from "./ModalDeleteNote.vue";



const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

function handleDelete() {
  modals.deleteNote = true;
}

const modals = reactive({
  deleteNote: false
});
</script>
