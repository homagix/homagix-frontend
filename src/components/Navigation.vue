<script setup lang="ts">
import { useStore } from "../store"

const store = useStore()
</script>

<template>
  <div id="navigation">
    <router-link to="/register" v-if="!store.state.user">Registrieren</router-link>
    <div v-if="store.state.user">
      {{ store.state.user.name }}
      <router-link to="/logout">Logout</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#navigation {
  text-align: right;
}
</style>
