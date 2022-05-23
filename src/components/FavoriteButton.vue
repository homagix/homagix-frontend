<script lang="ts" setup>
import { computed } from "vue"
import { useStore, ActionType } from "@/store"
import { Dish } from "@/types"

interface Props {
  dish: Dish
}

const props = defineProps<Props>()

const store = useStore()
const favorite = computed(() => (props.dish.isFavorite ? "★" : "☆"))

const toggleFavorite = () => store.dispatch(ActionType.TOGGLE_FAVORITE, props.dish.id)
const title = props.dish.isFavorite ? "Von der Favoritenliste entfernen" : "Zur Favoritenliste hinzufügen"
</script>

<template>
  <a href="#" class="favorite" @click.stop.prevent="toggleFavorite" :title="title"> {{ favorite }}</a>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
  margin-right: 0.5rem;

  &:hover {
    color: #888888;
  }
}
</style>
