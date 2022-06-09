<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

        <a
          ref="navbarBurgerRef"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="showMobileNav = !showMobileNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        ref="navbarMenuRef"
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
      >
        <div class="navbar-start">
          <button
            v-if="authStore.isLoggedIn"
            @click="logout"
            class="button is-small is-info mt-3 ml-3"
          >
            Logout {{ authStore.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            @click="showMobileNav = false"
            to="/"
            class="navbar-item"
            active-class="is-active"
          >
            Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            to="/stats"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/auth";

const authStore = useStoreAuth();

const showMobileNav = ref(false);
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, () => (showMobileNav.value = false), {
  ignore: [navbarBurgerRef],
});

const logout = () => {
  showMobileNav.value = false;
  authStore.logoutUser();
};
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
