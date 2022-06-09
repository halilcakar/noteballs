<template>
  <NavBar />
  <main class="container is-max-desktop px-2 py-4">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/Layout/NavBar.vue";
import { useStoreNotes } from "@/stores/notes";
import { onMounted } from "vue";

const storeNotes = useStoreNotes();

onMounted(() => storeNotes.getNotes());
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
