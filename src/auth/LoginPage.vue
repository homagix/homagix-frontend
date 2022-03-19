<script setup lang="ts">
import { useRouter } from "vue-router"
import AppButton from "../components/AppButton.vue"

const router = useRouter()
</script>

<template>
  <h2 class="title is-4">Willkommen!</h2>
  <p>
    Du bist bereits registriert? Um deine Daten zu schützen, musst du den Bookmark verwenden, den du nach der
    Registrierung erhalten hast.
  </p>

  <p>Du willst dich neu registrieren? Dann geht's <router-link to="/register">hier entlang</router-link></p>

  <div class="button-list">
    <AppButton @click="router.back">Abbrechen</AppButton>
  </div>
</template>

<style lang="scss">
.button-list {
  margin-top: 1rem;
}
</style>
