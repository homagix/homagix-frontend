<script setup lang="ts">
import { computed } from "vue"
import { ActionType, useStore } from "./store"

const store = useStore()
const error = computed(() => store.state.error)

function clearErrors() {
  store.dispatch(ActionType.CLEAR_ERROR)
}
</script>

<template>
  <o-notification root-class="errorBox" v-if="error" closable variant="danger" @close="clearErrors">
    <router-link v-if="error.link" :to="error.link" @click="clearErrors">{{ error.message }}</router-link>
    <span v-else>{{ error.message }}</span>
  </o-notification>
</template>

<style scoped lang="scss">
.errorBox {
  margin: 1rem;
}
</style>
