import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const useStoreAuth = defineStore({
  id: "storeAuth",
  state: () => ({
    user: {},
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
        } else {
          this.user = {};
          this.router.replace("/auth");
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((error) => console.error(error));
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredentials) => console.log(userCredentials))
        .catch((error) => console.error(error));
    },
    logoutUser() {
      signOut(auth).then(console.log).catch(console.error);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user.id,
  },
});
