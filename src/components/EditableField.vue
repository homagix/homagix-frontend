<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  type?: "string" | "number"
  value: string | number
  editable: boolean
}>()

const emit = defineEmits<{
  (event: "input", value: string): void
}>()

function input(event: Event) {
  emit("input", (event.target as HTMLInputElement).innerText)
}

const classes = computed(() => props.type && ({ [props.type]: true }))
</script>

<template>
  <span
    :class="classes"
    :contenteditable="editable"
    @input="input"
  >
    {{ value }}
  </span>
</template>

<style lang="scss" scoped>
span {
  padding: 2px 4px;

  &.editable {
    border-color: auto;
    appearance: inherit;
    width: auto;
  }

  &.number {
    text-align: right;
    background-color: transparent;
    border-radius: 0;
    display: inline;
    font-size: inherit;
    margin: 0;
    min-width: unset;
    height: auto;
  }
}
</style>
