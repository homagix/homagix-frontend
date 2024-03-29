<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { ActionType, useStore } from "@/store"
import { useRouter } from "vue-router"
import type { Dish, Ingredient, Item } from "@/types"
import { getImageUrl } from "@/api"
import AppButton from "./AppButton.vue"
import FavoriteButton from "./FavoriteButton.vue"
import { VueShowdown } from "vue-showdown"
import IngredientsList from "./IngredientsList.vue"

const props = defineProps<{ id: string }>()

const store = useStore()
const router = useRouter()

const showdownOptions = {
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
}

const dish = computed(() => ({ ...store.state.dishes.find(dish => dish.id === props.id) } as Dish))
const description = computed(() => dish.value.recipe || "Noch gibt es keine Beschreibung zu diesem Gericht")

const mainImage = computed(() => {
  const images = dish.value.images
  if (images && images.length > 0) {
    return { "background-image": "url(" + getImageUrl(images[0]) + ")" }
  }
  return undefined
})

const additionalImages = computed(() => {
  const images = dish.value.images
  if (images && images.length > 1) {
    return dish.value.images.slice(1).map(i => getImageUrl(i))
  }
  return []
})

const editMode = ref(false)
const editedDish = ref({ ...dish.value })
const ingredients = ref(dish.value.items?.map(getIngredient))

function getIngredient(item: Item): Ingredient {
  const ingredient = store.state.ingredients?.find(ingredient => ingredient.id === item.id) as Ingredient
  return { ...ingredient, amount: item.amount }
}

watch(dish, () => (ingredients.value = dish.value.items?.map(getIngredient)))

function backToList() {
  router.push("/recipes")
}

function revert() {
  editMode.value = false
}

function edit() {
  if (dish.value?.isEditable) {
    editMode.value = true
  }
}

function listChange(newList: Ingredient[]) {
  ingredients.value = newList
  editedDish.value.items = newList.map(ingredient => ({ id: ingredient.id, amount: ingredient.amount }))
}

async function save() {
  await store.dispatch(ActionType.SAVE_DISH, editedDish.value)
  editMode.value = false
}
</script>

<template>
  <section v-if="dish">
    <div class="title is-4">
      <span v-if="!editMode">{{ dish.name }}</span>
      <input v-else v-model="editedDish.name" />
      <FavoriteButton :dish="dish" />
    </div>

    <div class="image-ingredients">
      <div class="image-wrapper">
        <o-icon v-if="!mainImage" icon="image"></o-icon>
        <div v-if="mainImage" id="main-image" :style="mainImage" />
      </div>

      <div class="ingredients-list-container">
        <p class="title is-6">Zutaten:</p>
        <IngredientsList :ingredients="ingredients" />
      </div>
    </div>

    <VueShowdown
      v-if="!editMode"
      class="description"
      :markdown="description"
      flavor="github"
      :options="showdownOptions"
    />
    <textarea v-else v-model="editedDish.recipe" />

    <img v-for="(img, index) in additionalImages" :key="index" :src="img" />

    <div class="buttons">
      <AppButton v-if="!editMode" icon="list" @click="backToList">Zurück</AppButton>
      <AppButton v-if="editMode" icon="xmark" @click="revert">Verwerfen</AppButton>
      <AppButton v-if="dish.isEditable && !editMode" icon="edit" @click="edit">Bearbeiten</AppButton>
      <AppButton v-if="editMode" icon="save" @click="save">Speichern</AppButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.title,
.image-ingredients {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  column-gap: 5px;

  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }

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

  #main-image {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    min-height: 300px;
  }
}

.description {
  margin-bottom: 1rem;

  &:deep(ol), &:deep(ul) {
    list-style: initial;
    padding-left: 30px;
  }
}

textarea {
  width: 100%;
  height: 300px;
  font-family: Courier, fixed;
  font-size: 1rem;
  line-height: 1.3rem;
  padding: 0.5rem;
}

.title input {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
}

.buttons {
  padding-bottom: 1rem;
}

@media screen and (min-width: 600px) {
  .ingredients-list-container {
    max-width: 33%;
  }
}
</style>
