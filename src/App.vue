<template>
  <NavBar />
  <main class="container is-max-desktop px-2 py-4">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/Layout/NavBar.vue";
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
