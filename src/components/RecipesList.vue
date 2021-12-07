<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex"
import { Dish } from "../types"
import { ActionType } from "../store"

const store = useStore()
const dishes = computed(() => store.state.dishes)

const sortedDishes = computed(() => {
  const filteredDishes = dishes.value.filter((d: { alwaysOnList: boolean; name: string }) => !d.alwaysOnList)
  return filteredDishes.sort((d1, d2) => d1.name.localeCompare(d2.name)) as Dish[]
})

store.dispatch(ActionType.LOAD_DISHES)
</script>

<template>
  <h2>Rezepte</h2>
  <ul id="recipes">
    <li v-for="dish in sortedDishes" :key="dish.id">
      {{ dish.name }}
    </li>
  </ul>
</template>
