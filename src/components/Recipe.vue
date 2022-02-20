<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import { Dish } from "@/types"
import { getImageUrl } from "@/api"

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
    <h2>{{ dish.name }}</h2>
    <img v-if="dish.image" :src="image(dish)" />
    <ul id="ingredient-list">
      <li v-for="ingredient in ingredients()" :key="ingredient.id">
        {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>

    <p>{{ dish.recipe }}</p>

    <button @click="backToList">Zurück</button>
  </section>
</template>
