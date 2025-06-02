<script setup>
import { ref, watch } from 'vue'

const codeGame = ref('')

const emit = defineEmits(['status'])

const handleFocus = () => emit('status', 'focus')
const handleBlur = () => {
  if (codeGame.value === '') {
    emit('status', 'blur')
  }
}

watch(codeGame, (newValue) => emit('status', newValue))
</script>

<template>
  <div class="flex flex-col items-center relative">
    <div class="flex items-center">
      <input
        @focus="handleFocus"
        @blur="handleBlur"
        type="text"
        v-model="codeGame"
        class="w-[220px] text-center text-[#fdfdfd] bg-black/60 rounded-lg p-[0.3rem] outline-none px-2 text-[0.9rem]" />
    </div>
    <small class="text-[#ffe4c4] [text-shadow:0_0_4px_black]">pega el código del juego y presiona UNIRSE AL JUEGO</small>
  </div>
</template>
