<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Ichildrens {
  element: HTMLElement
  height: number
}

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  paddingTop: {
    type: Number,
    default: 5,
  },
  paddingBottom: {
    type: Number,
    default: 5,
  },
  transition: {
    type: Number,
    default: 0.3,
  },
})

const parent = ref()
const childrenns = ref<Ichildrens[]>([])

onMounted(() => {
  const childs = [...parent.value.childNodes]
  childs.shift()
  childs.reverse().shift()
  childs.forEach((el) => {
    childrenns.value.push({ element: el, height: el.scrollHeight })
  })
})

watch(
  () => props.visible,
  (cur) => {
    childrenns.value.forEach((element) => {
      const el = element.element
      if (cur) {
        const height = element.height + props.paddingTop + props.paddingBottom
        el.style.cssText = `
          padding-bottom: ${props.paddingBottom}px;
          padding-top: ${props.paddingTop}px;
          height:  ${height}px;
        `
      } else {
        el.style.cssText = ``
      }
    })
  }
)

const transition = props.transition + 's'
</script>

<template>
  <div
    ref="parent"
    class="accordion__daskk231fas2"
    :class="{ active: visible }"
  >
    <slot></slot>
  </div>
</template>

<style lang="sass">

.accordion__daskk231fas2
  visibility: hidden
  opacity: 0
  transition: v-bind(transition)
  div, button, a
    display: block
    transition: v-bind(transition)
    height: 0px
  &.active
    visibility: visible
    opacity: 1
</style>
