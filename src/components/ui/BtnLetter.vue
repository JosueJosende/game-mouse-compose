<script setup lang="ts">
import type { ref, PropType } from 'vue'
import type { Letter } from '@/types/type-game'

defineProps({
  letter: {
    type: Object as PropType<Letter>,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  isLast: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    default: 1
  }
})

defineEmits(['select'])
</script>

<template>
  <button
    class="transition-all duration-150 select-none"
    :class="[isSelected ? (isLast ? 'bg-[#f59e0b9c] scale-y-105 scale-x-110 shadow-lg shadow-accent-500/30' : 'bg-[#7aa5da8c] scale-y-105 scale-x-110') : 'bg-white/10 hover:bg-white/20', isSelected ? 'text-white' : 'text-white/90', level == 3 ? 'hexagon-hard' : level == 2 ? 'hexagon-medium' : 'hexagon-easy']"
    @click="$emit('select')">
    <span class="text-2xl md:text-2xl font-bold">
      {{ letter.letter.toUpperCase() }}
    </span>
    <!-- <span
      v-if="isSelected"
      class="absolute bottom-1 right-4 text-xs bg-white/20 rounded-full flex items-center justify-center">
      {{ letter.index }}
    </span> -->
  </button>
</template>
