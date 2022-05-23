<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import { Dish } from "@/types"
import { getImageUrl } from "@/api"
import AppButton from "./AppButton.vue"
import FavoriteButton from "./FavoriteButton.vue"

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
    <div class="title is-4">
      <span>{{ dish.name }}</span>
      <FavoriteButton :dish="dish" />
    </div>

    <div class="image-ingredients">
      <div class="image-wrapper">
        <o-icon icon="image"></o-icon>
        <img v-if="dish.image" :src="image(dish)" />
      </div>
      <div class="wrapper">
        <div id="ingredient-list">
          <template v-for="ingredient in ingredients()" :key="ingredient.id">
            <span>{{ ingredient.amount }}</span>
            <span>{{ ingredient.unit }}</span>
            <span>{{ ingredient.name }}</span>
          </template>
        </div>
      </div>
    </div>

    <div id="description">{{ dish.recipe || "Noch gibt es keine Beschreibung zu diesem Gericht" }}</div>

    <AppButton @click="backToList">Zurück</AppButton>
  </section>
</template>

<style scoped lang="scss">
.title,
.image-ingredients {
  display: flex;
  justify-content: space-between;
}

.image-ingredients {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  column-gap: 5px;

  .image-wrapper {
    width: 100%;
    position: relative;

    .icon {
      background: #f5f5f5;
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 100px;
      color: #dddddd;
      z-index: 0;
    }

    img {
      position: relative;
    }
  }
}

#ingredient-list {
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto 1fr;
  border: 1px solid #888;
  padding: 3px;
  align-content: flex-start;

  > * {
    padding: 3px;
  }

  > *:nth-child(3n-2) {
    text-align: right;
  }
}

#description {
  margin-bottom: 1rem;
}
</style>
