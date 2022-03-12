<script setup lang="ts">
import { computed } from "vue"
import { ActionType, useStore } from "@/store"
import Navigation from "./components/Navigation.vue"

const store = useStore()
const error = computed(() => store?.state.error)

store.dispatch(ActionType.LOAD_DISHES)
store.dispatch(ActionType.LOAD_INGREDIENTS)

function clearError() {
  store.dispatch(ActionType.CLEAR_ERROR)
}
</script>

<template>
  <div class="title">
    <h1><router-link to="/">Homagix</router-link></h1>
    <Navigation />
  </div>

  <div v-if="error" class="error-container">
    <span @click="clearError">×</span>
    {{ error.message }}
  </div>

  <div class="content">
    <router-view></router-view>
  </div>

  <!-- 
  <Alert />
  <LoginDialog />
  <LostPasswordDialog />
  <EditableIngredientList />
  -->
</template>

<style lang="scss">
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  line-height: 1.3;
}

.title {
  margin: 0;
  padding: 10px 10px 5px;
  background: linear-gradient(to bottom right, #f0a30a, rgb(240, 205, 10));
  overflow: hidden;

  h1 {
    position: relative;
    float: left;
    font-size: 28px;
    margin: 0;
    padding: 0 30px 0 0;

    &:after {
      content: "";
      display: block;
      position: absolute;
      left: -0.3px;
      top: -0.07em;
      width: 0.55em;
      height: 0.55em;
      border: 0.19em none #ffff00;
      border-top-style: solid;
      border-left-style: solid;
      transform: scale(1, 0.66) rotate(45deg);
    }

    a {
      color: #ffff00;
      text-decoration: none;
    }
  }

  input {
    font: 1em Arial, helvetica, sans-serif;
    border: none;
  }
}

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

.content {
  padding: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

img {
  max-width: 100%;
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
