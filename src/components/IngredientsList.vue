<script setup lang="ts">
import type { Ingredient } from "@/types"

defineProps<{ ingredients: Ingredient[] }>()
</script>

<template>
  <div class="box">
    <h2 class="subtitle">Zutaten</h2>
  <div class="ingredient-list">
    <template v-for="ingredient in ingredients" :key="ingredient.id">
      <span>{{ ingredient.amount }}</span>
      <span>{{ ingredient.unit }}</span>
      <span>{{ ingredient.name }}</span>
    </template>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.ingredient-list {
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto 1fr;
  align-content: flex-start;
  min-height: 300px;
  min-width: 200px;

  > * {
    padding: 3px;
  }

  > *:nth-child(3n-2) {
    text-align: right;
  }
}
</style>
