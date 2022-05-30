<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{ label }}</label>

    <div class="field">
      <div class="control">
        <textarea v-autofocus v-model="modelValue" @input="$emit('update:modelValue', modelValue)" class="textarea"
          :placeholder="placeholder" ref="textareaRef" />
      </div>
      <small class="has-text-white">
        <span>{{ modelValue.length }}</span> / 100
      </small>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutofocus } from "@/directives";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Add a new note",
  },
  label: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref(null);

const focusTextarea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextarea,
});
</script>
