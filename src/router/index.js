import { createRouter, createWebHashHistory } from "vue-router";
import ViewNotes from "@/views/ViewNotes.vue";
import ViewStats from "@/views/ViewStats.vue";
import ViewEditNote from "@/views/ViewEditNote.vue";

const routes = [
  {
    path: "/",
    name: "notes",
    component: ViewNotes,
  },
  {
    path: "/edit/:id",
    name: "edit-note",
    component: ViewEditNote,
  },
  {
    path: "/stats",
    name: "stats",
    component: ViewStats,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
