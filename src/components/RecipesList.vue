<script setup lang="ts">
import { computed } from "vue"
import { Dish } from "@/types"
import { ActionType, Store, useStore } from "@/store"

const store: Store = useStore()
const dishes = computed(() => store.state.dishes)

const sortedDishes = computed(() => {
  const filteredDishes = dishes.value.filter(d => !d.alwaysOnList)
  return filteredDishes.sort((d1, d2) => d1.name.localeCompare(d2.name)) as Dish[]
})

</script>

<template>
  <h2>Rezepte</h2>
  <ul id="recipes">
    <li v-for="dish in sortedDishes" :key="dish.id">
      {{ dish.name }}
    </li>
  </ul>
</template>
