<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex"
import { ActionType } from "./store"

const store = useStore()
const error = computed(() => {
  return store?.state.error
})

function clearError() {
  store.commit(ActionType.CLEAR_ERROR)
}
</script>

<template>
  <div class="title">
    <h1>Homagix</h1>
    <!-- <Navigation /> -->
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

<style>
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
      left: -0.3px;
      top: -0.07em;
      width: 0.55em;
      height: 0.55em;
      border: 0.19em none #ffff00;
      border-top-style: solid;
      border-left-style: solid;
      transform: scale(1, 0.66) rotate(45deg);
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

ul {
  list-style: none;
  padding: 0;
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
