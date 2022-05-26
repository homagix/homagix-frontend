<script setup lang="ts">
import { computed, ref } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import { Dish, Ingredient, Item } from "@/types"
import { getImageUrl } from "@/api"
import AppButton from "./AppButton.vue"
import FavoriteButton from "./FavoriteButton.vue"
import { VueShowdown } from "vue-showdown"
import IngredientsList from "./IngredientsList.vue"

const store = useStore()
const route = useRoute()
const router = useRouter()

const showdownOptions = {
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
}

const dish = computed(() => ({ ...store.state.dishes.find(dish => dish.id === route.params.id) } as Dish))
const description = computed(() => dish.value.recipe || "Noch gibt es keine Beschreibung zu diesem Gericht")

const ingredients = ref(dish.value.items?.map(getIngredient))

function getIngredient(item: Item): Ingredient {
  const ingredient = store.state.ingredients?.find(ingredient => ingredient.id === item.id) as Ingredient
  return { ...ingredient, amount: item.amount }
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

      <div>
        <p class="title is-6">Zutaten:</p>
        <IngredientsList :ingredients="ingredients" />
      </div>
    </div>

    <VueShowdown class="description" :markdown="description" flavor="github" :options="showdownOptions" />

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
    min-height: 300px;
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

.description {
  margin-bottom: 1rem;

  &:deep(ol) {
    padding-left: 30px;
  }
}
</style>
