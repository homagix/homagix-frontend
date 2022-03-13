<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import { Dish } from "@/types"
import { getImageUrl } from "@/api"
import AppButton from "./AppButton.vue"

const store = useStore()
const route = useRoute()
const router = useRouter()

const dish = computed(() => store.state.dishes.find(dish => dish.id === route.params.id))

function ingredients() {
  return dish.value?.items.map(item => {
    return {
      ...store.state.ingredients?.find(ingredient => ingredient.id === item.id),
      amount: item.amount,
    }
  })
}

function backToList() {
  router.push({ name: "recipes" })
}

function image(dish: Dish) {
  return getImageUrl(dish.image)
}
</script>

<template>
  <section v-if="dish">
    <div class="title is-4">{{ dish.name }}</div>
    <img v-if="dish.image" :src="image(dish)" />
    <div class="wrapper" id="ingredient-list">
      <template v-for="ingredient in ingredients()" :key="ingredient.id">
        <span class="number">{{ ingredient.amount }}</span>
        <span>{{ ingredient.unit }}</span>
        <span>{{ ingredient.name }}</span>
      </template>
    </div>

    <p>{{ dish.recipe }}</p>

    <AppButton @click="backToList">Zurück</AppButton>
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto 1fr;
  border: 1px solid #888;
  padding: 3px;

  > * {
    padding: 3px;
  }
}

.number {
  text-align: right;
}
</style>
