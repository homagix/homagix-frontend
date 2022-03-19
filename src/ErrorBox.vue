<script setup lang="ts">
import { computed } from "vue"
import { ActionType, useStore } from "./store"

const store = useStore()
const error = computed(() => store.state.error)

function clearError() {
  store.dispatch(ActionType.CLEAR_ERROR)
}
</script>

<template>
  <div v-if="error" class="error-container">
    <span @click="clearError">×</span>
    <router-link v-if="error.link" :to="error.link">{{ error.message }}</router-link>
    <span v-else>{{ error.message }}</span>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  border: 2px solid red;
  margin: 10px;
  padding: 10px;

  span {
    cursor: pointer;
    float: right;
  }
}
</style>
