<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "../store"

const props = defineProps<{ open: Boolean }>()

const store = useStore()

const navbarClasses = computed(() => "navbar-menu" + (props.open ? " is-active" : ""))
</script>

<template>
  <div id="navbar" :class="navbarClasses">
    <div class="navbar-start">
      <!-- <router-link class="navbar-item" to="/recipes"> Rezepte </router-link>
      <router-link class="navbar-item" to="/favorites"> Favoriten </router-link> -->
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link to="/register" v-if="!store.state.user" class="button is-primary"> Registrieren </router-link>
          <router-link to="/logout" v-else class="button is-light">Abmelden</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-menu {
  &.is-active {
    @media (min-width: 480px) {
      position: absolute;
      top: 3.3rem;
      right: 0;
      display: inline-block;
    }
  }

  @media screen and (max-width: 1023px) {
    flex-grow: 0;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
}
</style>
