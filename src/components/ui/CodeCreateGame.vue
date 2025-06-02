<script setup>
import { ref } from 'vue'
import { initGameIdentifiers } from '@/stores/gameStore'

const showCopied = ref(false)
const isHighlighted = ref(false)

const props = defineProps({
  gameId: {
    type: String,
    default: null
  }
})

const copygameId = async () => {
  try {
    await navigator.clipboard.writeText(props.gameId)
    showCopied.value = true
    isHighlighted.value = true

    setTimeout(() => {
      showCopied.value = false
      isHighlighted.value = false
    }, 500)
  } catch (err) {
    console.error('Failed to copy invite code:', err)
  }
}
</script>

<template>
  <div class="flex flex-col items-center relative">
    <div class="flex items-center">
      <div
        class="w-[220px] text-[#fdfdfd] rounded-lg p-[0.4rem] outline-none px-2 text-[0.9rem] text-left transition-colors duration-300"
        :class="[isHighlighted ? 'bg-yellow-500/30' : 'bg-black/60']">
        {{ gameId }}
      </div>
      <button
        class="-ml-10 p-1 relative"
        @click="copygameId">
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95">
          <span
            v-if="showCopied"
            class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            Copiado
          </span>
        </transition>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fdfdfd"
          stroke-width="1">
          <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
        </svg>
      </button>
    </div>
    <small class="text-[#ffe4c4] [text-shadow:0_0_4px_black] text-center">comparte este código y presiona INICIAR JUEGO</small>
  </div>
</template>
