<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  id: {
    type: Number,
    required: true,
  },
  deleteHandler: {
    type: Function as PropType<(id: number) => Promise<void>>,
    required: true,
  },
  change: {
    type: Function as PropType<(id: number, title: string) => void>,
    default: () => null,
  },
  title: {
    type: String,
    default: '',
  },
})

const isOpen = ref(false)
const popupRef = ref<HTMLDivElement>()

onClickOutside(popupRef, () => (isOpen.value = false))

const changePossition = ref(false)

watch(isOpen, () => {
  if (isOpen.value) changePossition.value = true
  setTimeout(() => {
    if (!isOpen.value) changePossition.value = false
  }, 200)
})
</script>

<template>
  <div class="flex flex-column" :class="{ relative: changePossition }">
    <div class="popup" :class="{ active: isOpen }">
      <button class="cbtn" @click="deleteHandler(id)">удалить</button>
      <button v-if="change" class="cbtn" @click="change(id, title)">
        изменить
      </button>
    </div>
    <div class="dots__wrapper">
      <div
        ref="popupRef"
        class="flex flex-col gap-y-0.5 items-center w-4 cursor-pointer"
        @click="isOpen = !isOpen"
      >
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.popup
  position: absolute
  border: 2px solid var(--back-main)
  border-radius: 8px
  background: var(--back-second)
  right: 20px
  top: 0
  visibility: hidden
  opacity: 0
  transition: .2s
  &.active
    opacity: 1
    visibility: visible

.dot
  border: 2px solid var(--color)
  color: black
  border-radius: 50px

.dots__wrapper
  display: flex
  align-items: center
  border-radius: 4px
  transition: .4s
  &:hover
    background: var(--back-second)
</style>
