<script setup lang="ts">
const props = defineProps<{
  icon?: string
}>()
</script>

<template>
  <button>
    <o-icon v-if="icon" :icon="props.icon"></o-icon>
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  padding: 5px 20px;
  border: 2px solid #aaaaaa;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: white;

  &:hover {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #dddddd;
  }

  &::v-deep .icon {
    margin: -3px 3px -3px -5px;
  }
}

button + button {
  margin-left: 10px;
}

button.inline {
  float: right;
  padding: 2px 1px 5px 2px;
  margin-left: 5px;
  background: none;
  position: relative;
  top: -1px;
  height: 30px;
  width: 24px;
  font-size: 1.6em;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #dddddd;
  }

  &:active {
    background-color: #bbbbbb;
  }

  &.delete {
    color: red;
  }
}
</style>
