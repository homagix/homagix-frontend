<script setup lang="ts">
import { computed, ref } from "vue"
import { ActionType, useStore } from "@/store"
import Navigation from "./components/Navigation.vue"

const store = useStore()
const error = computed(() => store?.state.error)

const navbarOpen = ref(false)
store.dispatch(ActionType.LOAD_DISHES)
store.dispatch(ActionType.LOAD_INGREDIENTS)

function clearError() {
  store.dispatch(ActionType.CLEAR_ERROR)
}

function toggleMenu(event: MouseEvent) {
  if (event.target) {
    navbarOpen.value = !navbarOpen.value
  }
}

function closeMenu() {
  navbarOpen.value = false
}
</script>

<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation" @click="closeMenu">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <h1 class="title">Homagix</h1>
      </router-link>

      <div v-if="store.state.user" class="username">
        {{ store.state.user.name }}
      </div>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click.stop="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <Navigation :open="navbarOpen" />
  </nav>

  <!-- TODO style this with bulma/oruga -->
  <div v-if="error" class="error-container">
    <span @click="clearError">×</span>
    {{ error.message }}
  </div>

  <section class="section" @click="closeMenu">
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

#navbar.is-active .navbar-item {
  color: #000000 !important;
}

.navbar-brand {
  justify-content: space-between;
}

.error-container {
  border: 2px solid red;
  margin: 10px;
  padding: 10px;

  span {
    cursor: pointer;
  }
}

h1.title {
  color: #ffff00;
  position: relative;
  float: left;
  font-size: 28px;
  margin: 0;
  padding: 0 30px 0 0;

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 1.2px;
    top: -0.07em;
    width: 0.65em;
    height: 0.65em;
    border: 0.19em none #ffff00;
    border-top-style: solid;
    border-left-style: solid;
    transform: scale(1, 0.66) rotate(45deg);
  }
}

.username {
  font-size: 120%;
  line-height: 3.3rem;
  margin-left: auto;
}

#app .navbar-burger {
  margin-left: 0;
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
