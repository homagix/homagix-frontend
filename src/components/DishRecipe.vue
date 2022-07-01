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
const image = getImageUrl(dish.value.image as string)
const description = computed(() => dish.value.recipe || "Noch gibt es keine Beschreibung zu diesem Gericht")

const editMode = ref(false)
const editedDish = ref({ ...dish.value })
const ingredients = ref(dish.value.items?.map(getIngredient))
const toggleFavorite = () => store.dispatch(ActionType.TOGGLE_FAVORITE, dish.value.id)

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
    <div class="title">
      <o-field style="max-width: 800px">
        <o-input expanded v-model="editedDish.name" :disabled="!editMode"/>
        <o-button :icon-pack="dish.isFavorite?'fa-solid':'fa-regular'" icon-right="fa-star" @click="toggleFavorite" ></o-button>
      </o-field>
    </div>

    <div class="image-ingredients">
      <div class="image-wrapper box">
        <o-icon icon="image"></o-icon>
        <img v-if="dish.image" :src="image" />
      </div>

        <IngredientsList :ingredients="ingredients" />
    </div>
    <o-field label="Beschreibung" class="box">
    <VueShowdown
      v-if="!editMode"
      class="description"
      :markdown="description"
      flavor="github"
      :options="showdownOptions"
    />

    <o-input type="textarea" v-else v-model="editedDish.recipe" />
    </o-field>
    <div class="buttons">
      <AppButton icon="list" v-if="!editMode" @click="backToList">Zurück</AppButton>
      <AppButton icon="xmark" v-if="editMode" @click="revert">Verwerfen</AppButton>
      <AppButton icon="edit" v-if="dish.isEditable && !editMode" @click="edit">Bearbeiten</AppButton>
      <AppButton icon="save" v-if="editMode" @click="save">Speichern</AppButton>
    </div>
  </section>
</template>

<style scoped lang="scss">

.image-ingredients {
  margin-bottom: 1rem;
  column-gap: 1rem;

  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
  }

  .image-wrapper {
    width: 100%;
    min-height: 300px;
    position: relative;
    padding: 0;
    margin: 0;

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

:deep(textarea) {
  width: 100%;
  height: 300px;
  font-family: Courier, fixed;
  font-size: 1rem;
  line-height: 1.3rem;
  padding: 0.5rem;
}

:deep(input[type="text"]) {
  background-color: transparent;
  color: #4a4a4a
}

.buttons {
  padding-bottom: 1rem;
}
</style>
