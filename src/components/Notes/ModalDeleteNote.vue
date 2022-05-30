<template>
  <div class="modal is-active px-5">
    <div class="modal-background"></div>
    <div ref="modalRef" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button @click="handleDelete" class="button is-danger is-light">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { onClickOutside } from "@vueuse/core";
import { useStoreNotes } from '@/stores/notes';

const storeNotes = useStoreNotes();


const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  noteId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const closeModal = () => {
  emit('update:modelValue', false)
}

const modalRef = ref(null);
onClickOutside(modalRef, closeModal);
const handleEsc = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
}
onMounted(() => document.addEventListener('keydown', handleEsc));
onUnmounted(() => document.removeEventListener('keydown', handleEsc));

function handleDelete() {
  storeNotes.deleteNote(props.noteId);
}
</script>