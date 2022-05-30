<template>
  <RouterLink to="/">Notes</RouterLink> | 
  <RouterLink to="/stats">Links</RouterLink>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
