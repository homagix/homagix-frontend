<script setup lang="ts">
import { computed, ref } from "vue"

type Item = { id: string; name: string }

const props = defineProps<{
  id: string
  list: Item[]
}>()

const emit = defineEmits<{
  (event: "change", value: Item): void
}>()

const search = ref("")
const selectedIndex = ref(-1)
const suggestions = ref([] as Item[])
const listId = props.id + "-result-list"

const activeDescendant = computed(() => (selectedIndex.value >= 0 ? "" + selectedIndex.value : undefined))

function isSelected(index: number) {
  return index === selectedIndex.value
}

function selectItem(item: Item) {
  emit("change", item)
  reset()
}

const listHeight = computed(() => `${suggestions.value.length * 1.3 + 0.11}em`)

function reset() {
  suggestions.value = []
  selectedIndex.value = -1
  search.value = ""
}

function handleEnter(event: KeyboardEvent) {
  if ("Enter" === event.code) {
    if (selectedIndex.value >= 0) {
      selectListEntry()
      const item = suggestions.value.find(item => item.name === search.value)
      emit("change", item as Item)
    } else {
      emit("change", { id: "", name: search.value })
    }
    reset()
  }
}

function handleArrowKeys(event: KeyboardEvent) {
  if ("ArrowDown" === event.code) {
    selectedIndex.value = Math.min(suggestions.value.length - 1, selectedIndex.value + 1)
  } else if ("ArrowUp" === event.code) {
    selectedIndex.value = Math.max(-1, selectedIndex.value - 1)
  }
}

function selectListEntry() {
  const item = suggestions.value[selectedIndex.value]
  search.value = item.name
}

function updateSuggestions() {
  if (search.value === "") {
    reset()
  } else {
    const pattern = new RegExp(search.value, "i")
    suggestions.value = props.list.filter(item => item.name.match(pattern))
  }
}
</script>

<template>
  <div class="autocomplete" :id="id">
    <input
      type="text"
      v-model="search"
      @keydown="handleEnter"
      @keyup="handleArrowKeys"
      @input="updateSuggestions"
      role="combobox"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      :aria-owns="listId"
      :aria-activedescendant="activeDescendant"
      aria-expanded="false"
    />
    <select role="listbox" :id="listId" :size="2">
      <option
        v-for="(item, index) in suggestions"
        :key="item.id"
        :selected="isSelected(index)"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.autocomplete {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 100%;

  input {
    width: 100%;
    font-size: 1em;
    margin-top: 2px;
  }

  input:focus + select,
  select:hover {
    display: inline;
  }

  select {
    height: v-bind(listHeight);
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 10em;
    overflow: auto;
    background: white;
    margin: -4px 0 0;

    &:empty {
      border: none;
    }

    option {
      overflow-x: auto;
    }
  }
}
</style>
