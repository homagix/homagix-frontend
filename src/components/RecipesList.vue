<script setup lang="ts">
import { computed } from "vue"
import { Dish } from "@/types"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import Favorite from "@/components/Favorite.vue"

const props = defineProps<{
  onlyFavorites?: boolean
}>()
const store = useStore()
const router = useRouter()
const route = useRoute()

const ingredientIds = computed((): Record<string, string> => {
  return Object.assign({}, ...store.state.ingredients.map(i => ({ [i.name.toLocaleLowerCase()]: i.id })))
})

function isSelectableDish(dish: Dish) {
  return !dish.alwaysOnList
}

function isFavoriteDish(dish: Dish) {
  return !props.onlyFavorites || dish.isFavorite
}

function containsRequestedIngredient(dish: Dish) {
  const id = route.query.ingredient && ingredientIds.value[(route.query.ingredient as string).toLocaleLowerCase()]
  return !id || dish.items.some(item => item.id === id)
}

const sortedDishes = computed(() => {
  const filteredDishes = store.state.dishes
    ?.filter(isSelectableDish)
    .filter(isFavoriteDish)
    .filter(containsRequestedIngredient)
  return filteredDishes?.sort((d1, d2) => d1.name.localeCompare(d2.name)) as Dish[]
})

function activate(id: string) {
  router.push({ name: "recipe", params: { id } })
}

function removeFilter() {
  router.push({ query: { ingredient: undefined } })
}

function isActive(path: string) {
  return { "is-active": route.path === path }
}

function pathTo(path: string) {
  return path + (route.query.ingredient ? `?ingredient=${route.query.ingredient}` : "")
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

    <router-link :to="{ path: '/wordcloud' }" class="wordcloud-toggle">
      <o-icon icon="magnifying-glass"></o-icon>
    </router-link>
  </div>

  <div class="tabs is-boxed" v-if="store.state.user">
    <ul>
      <li :class="isActive('/recipes')"><router-link :to="pathTo('recipes')">Alle</router-link></li>
      <li :class="isActive('/favorites')"><router-link :to="pathTo('favorites')">Favoriten</router-link></li>
    </ul>
  </div>

  <ul class="recipes-list" v-if="sortedDishes.length">
    <li v-for="dish in sortedDishes" :key="dish.id" @click="() => activate(dish.id)">
      <o-icon icon="utensils"></o-icon> {{ dish.name }} <Favorite :dish="dish" />
    </li>
  </ul>

  <div v-else>Keine Rezepte gefunden</div>
</template>

<style scoped lang="scss">
$hover-color: #eeeeee;
$pill-color: #eeeeee;

.recipes-list li {
  cursor: pointer;
  &:hover {
    background-color: $hover-color;
  }
}

.wordcloud-toggle {
  float: right;
  &:hover {
    background-color: $hover-color;
  }
}

.filter {
  display: inline;
  position: relative;
  background-color: $pill-color;
  padding: 0.25rem 1.3rem 0.25rem 0.75rem;
  border-radius: 0.5rem;

  .remove {
    font-size: 70%;
    color: #888888;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    &:hover {
      background-color: darken($color: $hover-color, $amount: 10%);
      border-radius: 50%;
    }

    .icon {
      height: 1.3rem;
      width: 1.3rem;
    }
  }
}

.tabs .is-active {
  font-weight: bold;
}
</style>
