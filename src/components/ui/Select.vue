<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: Array,
  defaultPosition: Number,
  icon: String
})

const emit = defineEmits(['selected'])

const buttonActive = ref(props.defaultPosition || 0)

const selectItem = (item, id) => {
  emit('selected', item)
  buttonActive.value = id
}
</script>

<template>
  <ul class="bg-black/60 flex list-none w-fit leading-none p-[0.2rem] rounded-lg justify-center items-center">
    <li
      v-if="icon !== ''"
      class="mx-2">
      <svg
        v-if="icon === '⏱️'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#a3a1a1">
        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
      </svg>
      <svg
        v-else-if="icon === 'level'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a3a1a1"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5" />
        <path d="M4 15l8 4l8 -4" />
        <path d="M12 11v-7" />
        <path d="M9 7l3 -3l3 3" />
      </svg>
    </li>
    <li
      v-for="(item, id) in items"
      :key="id"
      class="text-[#999999]">
      <button
        @click="selectItem(item, id)"
        :class="['font-sans text-sm border-none transition-all duration-300 px-3 py-1 rounded-md', id === buttonActive ? 'bg-white/20 text-[#fdfdfd]' : 'text-inherit bg-transparent']">
        <div v-if="icon !== ''">
          {{ item.name }}
        </div>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2">
          <path :d="item.name" />
        </svg>
      </button>
    </li>
  </ul>
</template>
