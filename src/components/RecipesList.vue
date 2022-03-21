<script setup lang="ts">
import { computed } from "vue"
import { Dish } from "@/types"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"

const store = useStore()
const router = useRouter()
const route = useRoute()

const ingredientIds = computed((): Record<string, string> => {
  return Object.assign({}, ...store.state.ingredients.map(i => ({ [i.name.toLocaleLowerCase()]: i.id })))
})
function containsRequestedIngredient(dish: Dish) {
  const id = route.query.ingredient && ingredientIds.value[(route.query.ingredient as string).toLocaleLowerCase()]
  return !id || dish.items.some(item => item.id === id)
}
const sortedDishes = computed(() => {
  const filteredDishes = store.state.dishes?.filter(d => !d.alwaysOnList && containsRequestedIngredient(d))
  return filteredDishes?.sort((d1, d2) => d1.name.localeCompare(d2.name)) as Dish[]
})

function activate(id: string) {
  router.push({ name: "recipe", params: { id } })
}

function removeFilter() {
  router.push({ query: { ingredient: undefined } })
}
</script>

<template>
  <div class="title is-4">
    Rezepte

    <div class="filter" v-if="route.query.ingredient">
      mit {{ route.query.ingredient }}
      <span class="remove" title="Filter entfernen" @click="removeFilter">
        <o-icon icon="remove" />
      </span>
    </div>

    <router-link :to="{ path: '/wordcloud' }">
      <o-icon icon="magnifying-glass" class="wordcloud"></o-icon>
    </router-link>
  </div>

  <ul id="recipes-list">
    <li v-for="dish in sortedDishes" :key="dish.id" @click="() => activate(dish.id)">
      <o-icon icon="utensils"></o-icon> {{ dish.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.wordcloud {
  float: right;
}

.filter {
  display: inline;
  position: relative;

  .remove {
    font-size: 70%;
    position: absolute;
    top: 0;
    cursor: pointer;
  }
}
</style>
