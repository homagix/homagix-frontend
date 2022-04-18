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
</style>
