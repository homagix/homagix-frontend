<script setup lang="ts">
import { computed } from "vue"
import { Dish } from "@/types"
import { useStore } from "@/store"

const store = useStore()

const sortedDishes = computed(() => {
  const filteredDishes = store.state.dishes?.filter(d => !d.alwaysOnList)
  return filteredDishes?.sort((d1, d2) => d1.name.localeCompare(d2.name)) as Dish[]
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
