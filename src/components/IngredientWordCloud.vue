<script setup lang="ts">
import { useStore } from "@/store"
import { computed, ref, watch } from "vue"
import { useRouter } from "vue-router"
import wordcloud from "wordcloud"

const store = useStore()
const router = useRouter()

const blackList = ["Salz", "Pfeffer", "Zucker", "Butter", "Mehl", "Öl", "Olivenöl"]

const ingredients = computed((): [string, number, string][] => {
  if (!store.state.ingredients.length) {
    return []
  }
  const ingredients = Object.assign(
    {},
    ...store.state.ingredients.map(i => ({ [i.id]: { id: i.id, name: i.name, count: 0 } }))
  ) as Record<string, { id: string; name: string; count: number }>

  store.state.dishes.flatMap(dish => dish.items).forEach(item => ingredients[item.id].count++)

  const url = (item: { name: string; count: number }) => "/recipes?ingredient=" + encodeURIComponent(item.name)

  return Object.values(ingredients)
    .filter(item => item.count)
    .filter(item => !blackList.includes(item.name))
    .sort((a, b) => Math.random() - 0.5)
    .map(item => ingredients[item.id])
    .map(item => [item.name, item.count * 6 + 2, url(item)])
})

const canvas = ref()

function update() {
  if (ingredients.value.length && canvas.value) {
    const canvasWrapper = document.createElement("div")
    const canvasEl = document.createElement("div")
    canvasEl.setAttribute("class", "wordcloud-canvas")
    canvasWrapper.appendChild(canvasEl)
    canvas.value.innerHTML = ""
    canvas.value.appendChild(canvasWrapper)
    wordcloud(canvasEl, {
      list: ingredients.value,
      shape: "square",
      click(item: typeof ingredients.value[0]) {
        router.push(item[2])
      },
    })
  }
}

watch(ingredients, update)
watch(update, () => undefined)
</script>

<template>
  <div class="button-list">
    <a @click="() => router.back()">
      <o-icon icon="close" />
    </a>
  </div>

  <div ref="canvas" class="wordcloud" />
</template>

<style>
.wordcloud-canvas,
.wordcloud > div,
.wordcloud {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>

<style scoped lang="scss">
.button-list {
  text-align: right;
  margin-top: 0;

  a {
    font-size: 32px;
    line-height: 1;
  }
}
</style>
