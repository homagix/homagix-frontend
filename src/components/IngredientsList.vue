<script setup lang="ts">
import type { Ingredient } from "@/types"

defineProps<{ ingredients: Ingredient[] }>()
</script>

<template>
  <div class="ingredient-list">
    <template v-for="ingredient in ingredients" :key="ingredient.id">
      <span>{{ ingredient.amount }}</span>
      <span>{{ ingredient.unit }}</span>
      <span>{{ ingredient.name }}</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ingredient-list {
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 6fr;
  border: 1px solid #888;
  padding: 3px;
  align-content: flex-start;
  min-height: 300px;
  min-width: 200px;

  @media (max-width: 599px) {
    width: 100%;
  }

  > * {
    padding: 3px;
  }

  > *:nth-child(3n-2) {
    text-align: right;
  }
}
</style>
