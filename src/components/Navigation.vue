<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store"

const props = defineProps<{open: Boolean}>()

const store = useStore()

const navbarClasses = computed(() => 'navbar-menu' + (props.open ? " is-active" : ""))
</script>

<template>
  <div id="navbar" :class="navbarClasses">
    <div class="navbar-start">
      <router-link class="navbar-item " to="/recipes"> Recipes </router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link to="/register" v-if="!store.state.user" class="button is-primary">
            Registrieren
          </router-link>
          <router-link to="/logout" v-else class="button is-light">Abmelden</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 480px) {
  .navbar-menu.is-active {
    position: absolute;
    right: 0;
    display: inline-block;
  }
}
</style>
