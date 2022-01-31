<script setup lang="ts">
import { computed } from "vue"
import { Dish } from "@/types"
import { useStore } from "@/store"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const sortedDishes = computed(() => {
  const filteredDishes = store.state.dishes?.filter(d => !d.alwaysOnList)
  return filteredDishes?.sort((d1, d2) => d1.name.localeCompare(d2.name)) as Dish[]
})

function activate(id: string) {
  router.push({ name: "recipe", params: { id } })
}
</script>

<template>
  <h2>Rezepte</h2>
  <ul id="recipes-list">
    <li v-for="dish in sortedDishes" :key="dish.id" @click="() => activate(dish.id)">
      <o-icon icon="utensils"></o-icon> {{ dish.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
li {
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
}
</style>
