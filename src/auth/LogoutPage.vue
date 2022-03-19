<script setup lang="ts">
import { useRouter } from "vue-router"
import AppButton from "../components/AppButton.vue"

const router = useRouter()
</script>

<template>
  <h2 class="title is-4">Ciao!</h2>
  <p>Wir hoffen, Dich bald wiederzusehen!</p>

  <div class="button-list">
    <AppButton id="recipes-button" @click="router.push('/recipes')">Zu den Rezepten</AppButton>
  </div>
</template>

<style lang="scss">
.button-list {
  margin-top: 1rem;
}
</style>
