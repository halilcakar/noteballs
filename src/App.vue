<template>
  <NavBar />
  <main class="container is-max-desktop px-2 py-4">
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useStoreAuth } from "@/stores/auth";
import NavBar from "@/components/Layout/NavBar.vue";

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
