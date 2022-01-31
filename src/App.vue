<script setup lang="ts">
import { computed, ref } from "vue"
import { ActionType, useStore } from "@/store"
<<<<<<< HEAD
import Navigation from "./components/Navigation.vue"

=======
import AppButton from "./components/AppButton.vue"
import logo from "@/assets/homagix.png"
>>>>>>> b7b46f6 (Update to latest oruga and include some initial styling)
const store = useStore()
const error = computed(() => store?.state.error)

const navbar = ref<HTMLElement>()
store.dispatch(ActionType.LOAD_DISHES)
store.dispatch(ActionType.LOAD_INGREDIENTS)

function clearError() {
  store.dispatch(ActionType.CLEAR_ERROR)
}

function toggleMenu(event: MouseEvent) {
  if (event.target) {
    const target = event.target as HTMLElement
    target.classList.toggle("is-active")
    navbar.value!.classList.toggle("is-active")
  }
}
</script>

<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <h1 >Homagix</h1>
      </a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <Navigation />
    <div id="navbar" ref="navbar" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/recipes"> Recipes </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- TODO style this with bulma/oruga -->
  <div v-if="error" class="error-container">
    <span @click="clearError">×</span>
    {{ error.message }}
  </div>

  <section class="section">
    <router-view></router-view>
  </section>

  <!--
  <Alert />
  <LoginDialog />
  <LostPasswordDialog />
  <EditableIngredientList />
  -->
</template>

<style lang="scss">
.error {
  color: red;
}

.error-container {
  border: 2px solid red;
  margin: 10px;
  padding: 10px;

  span {
    cursor: pointer;
  }
}

@media print {
  @page {
    size: A4 portrait;
  }

  h1 {
    padding: 10px;
  }

  button,
  .group {
    display: none;
  }
}
</style>
