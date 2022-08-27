<script setup lang="ts">
import type { Ingredient } from "@/types"
import IngredientsListRow from "./IngredientsListRow.vue"
import crypto from "crypto"
import { ref } from "vue"
import { useStore } from "@/store"

const props = defineProps<{
  ingredients: Ingredient[]
  editable: boolean
}>()

const emit = defineEmits<{
  (event: "input", value: Ingredient[]): void
}>()

const emptyItem = { id: "", amount: 1, unit: "Stk", name: "" }
const newItem = ref({ ...emptyItem })
const store = useStore()

function setItem(index: number, ingredient: Ingredient) {
  const list = [...props.ingredients]
  list.splice(index, 1, ingredient)
  emit("input", list)
}

function newItemChanged(ingredient: Ingredient) {
  if (ingredient.name && ingredient.amount) {
    newItem.value = { ...emptyItem }
    if (ingredient.id) {
      ingredient.unit = store.state.ingredients.find(i => i.id === ingredient.id)?.unit || ingredient.unit
    } else {
      ingredient.id = crypto.randomUUID()
    }
    emit("input", [...props.ingredients, ingredient])
  }
}

function deleteItem(index: number) {
  const list = [...props.ingredients]
  list.splice(index, 1)
  emit("input", list)
}
</script>

<template>
  <div class="ingredient-list">
    <IngredientsListRow
      v-for="(ingredient, index) in ingredients"
      :key="index"
      class="row"
      ref="existingItem"
      :ingredient="ingredient"
      @input="modified => setItem(index, modified)"
      @delete="() => deleteItem(index)"
      :editable="editable"
      :deletable="editable"
    />
    <IngredientsListRow
      v-if="editable"
      class="row new"
      ref="newItem"
      :ingredient="newItem"
      @input="newItemChanged"
      :editable="true"
    />
  </div>
</template>

<style scoped lang="scss">
.ingredient-list {
  border: 1px solid #888;
  padding: 3px;
  align-content: flex-start;
  width: 100%;
  min-width: 200px;
  min-height: 3em;

  @media (min-width: 800px) {
    align-content: flex-start;
    min-width: 200px;
  }

  .row {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 60px auto 1fr 1.6em;
  }
}
</style>
