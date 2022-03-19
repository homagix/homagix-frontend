<script setup lang="ts">
import { useRouter } from "vue-router"
import AppButton from "../components/AppButton.vue"

const router = useRouter()

function gotoRecipes() {
  router.push("/recipes")
}
</script>

<template>
  <h2 class="title is-4">Dein Zugang</h2>
  <p>
    Speichere diese Seite als Bookmark oder Favorit, dann kommst du einfach wieder hierher zurück, ohne dich einloggen
    zu müssen.
  </p>
  <p>Da jede:r mit dem Bookmark hierher kommt, solltest du diesen Link nicht an andere weiter geben.</p>

  <div class="button-list">
    <AppButton id="recipes-button" @click="gotoRecipes">Zu den Rezepten</AppButton>
  </div>
</template>
