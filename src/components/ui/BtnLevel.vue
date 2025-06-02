<script setup>
import { ref } from 'vue'
import { setLevel } from '@/stores/gameStore'

const level = ref(1)

const handleSetLevel = (newLevel) => {
  level.value = newLevel
  setLevel(newLevel)
}
</script>

<template>
  <button
    class="relative"
    v-for="(levelSel, index) in [1, 2, 3]"
    :key="levelSel"
    @click="handleSetLevel(levelSel)">
    <img
      class="w-full h-24 rounded-lg border border-transparent transition-all duration-300 ease-in-out"
      :class="level === levelSel ? 'opacity-100 scale-105 border-white' : 'opacity-50 scale-100 border-transparent'"
      :src="`./../../../public/size-${levelSel}.webp`"
      alt="Size Panel" />
    <small class="absolute top-2 left-2 text-white text-xs -rotate-6 font-semibold [text-shadow:0_0_4px_black]"
      >{{ index === 0 ? 'HARD' : index === 1 ? 'MEDIUM' : 'EASY' }} <br />
      {{ index === 0 ? '6x6' : index === 1 ? '7x7' : '8x8' }}</small
    >
  </button>
</template>
