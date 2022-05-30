import { watch } from "vue";

export function useWatchCharacters(ref, maxChars = 100) {
  watch(ref, (value) => {
    if (value.length >= maxChars) {
      alert("Only 100 characters allowed gosh..");
    }
  });
}
