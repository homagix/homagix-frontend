<script setup lang="ts">
import type { Ingredient } from "@/types"
import EditableField from "./EditableField.vue"
import AutocompleteField from "./AutocompleteField.vue"
import store from "@/store"

const props = defineProps<{
  ingredient: Ingredient
  editable: boolean
  deletable?: boolean
}>()

const emit = defineEmits<{
  (event: "input", value: Ingredient): void
  (event: "delete", value: Ingredient): void
}>()

const setAmount = (amount: string) => emit("input", { ...props.ingredient, amount: +amount })
const setUnit = (event: Event) => emit("input", { ...props.ingredient, unit: (event.target as HTMLInputElement).value })
const setName = ({ id, name }: { id: string; name: string }) => emit("input", { ...props.ingredient, id, name })
const deleteItem = () => emit("delete", props.ingredient)
</script>

<template>
  <div :class="{ row: true, editable }">
    <EditableField type="number" :value="ingredient.amount" @input="setAmount" :editable="editable" />

    <select :value="ingredient.unit" @input="setUnit" :disabled="!!ingredient.id">
      <option v-for="entry in store.state.units" :key="entry">{{ entry }}</option>
    </select>

    <EditableField v-if="ingredient.id" :value="ingredient.name" :editable="false" />
    <AutocompleteField
      v-else
      id="item-name"
      :value="ingredient.name"
      :list="store.state.ingredients"
      @change="setName"
    />

    <span v-if="deletable" class="icon delete" @click="deleteItem"></span>
  </div>
</template>

<style scoped lang="scss">
.row {
  span {
    white-space: nowrap;
  }

  select {
    border-color: transparent;
    font-size: 100%;
    color: black;

    &:disabled {
      appearance: none;
      padding-right: 15px;
    }
  }

  span.icon.delete {
    display: inline-block;
    margin: 4px 3px;
  }
}
</style>
