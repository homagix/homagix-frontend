<script setup lang="ts">
import { ActionType, useStore } from "@/store"
import { ref } from "vue"
import { useRouter } from "vue-router"
import AppButton from "../components/AppButton.vue"

const router = useRouter()
const store = useStore()

let name = ref("")

async function register() {
  await store.dispatch(ActionType.REGISTER_USER, name.value)
  router.push("/my")
}

function cancel() {
  router.back()
}
</script>

<template>
  <h2 class="title is-4">Neu registrieren</h2>
  <p>
    Hier kannst du deinem Zugang einen Namen (z.B. deinen Vornamen oder auch einen Phantasienamen) geben. Wir sprechen
    dich dann künftig damit an.
  </p>
  <label>
    Name
    <input type="text" v-model="name" />
  </label>

  <div class="button-list">
    <AppButton id="register-button" @click="register">Registrieren</AppButton>
    <AppButton id="cancel-button" @click="cancel">Abbrechen</AppButton>
  </div>
</template>

<style lang="scss">
label {
  display: block;
}

.button-list {
  margin-top: 1rem;
}
</style>
