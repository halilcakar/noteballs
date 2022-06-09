<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false"> Login </a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true"> Register </a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label for="" class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                required
                type="email"
                class="input"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                required
                type="text"
                class="input"
                placeholder="********"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button type="submit" class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "@vue/reactivity";
import { useStoreAuth } from "../stores/auth";

const register = ref(false);
const credentials = reactive({
  email: "jim@test.com",
  password: "test123",
});

const authStore = useStoreAuth();

const formTitle = computed(() => (register.value ? "Register" : "Login"));

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    return alert("Please fill in all fields");
  }
  if (register.value) {
    authStore.registerUser(credentials);
  } else {
    authStore.loginUser(credentials);
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
