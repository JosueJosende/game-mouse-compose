<script setup lang="ts">
import Select from '@/components/ui/Select.vue'
import BtnGameStart from '@/components/ui/BtnStartGame.vue'
import BtnGameJoin from '@/components/ui/BtnStartJoin.vue'

import { ref, onMounted } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore, initGameIdentifiers, setDifficulty, setLevel, joinToTheGame, createGame, setIsMultiplayer } from '@/stores/gameStore'

const itemsDifficulty: Array<{ name: string; val: string }> = [
  { name: '60"', val: 'easy' },
  { name: '120"', val: 'medium' },
  { name: '180"', val: 'hard' }
]

const itemsLevel: Array<{ name: string; val: string }> = [
  { name: '1', val: '1' },
  { name: '2', val: '2' },
  { name: '3', val: '3' }
]

const itemsNumPlayers: Array<{ name: string; val: string }> = [
  {
    name: 'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0 M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2',
    val: '1'
  },
  {
    name: 'M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85 ',
    val: '2'
  }
]

const game = useStore(gameStore)

const codeGame = ref<string | null>(null)
const viewJoin = ref<boolean>(false)
const playerId = ref<string | null>(null)
const gameId = ref<string | null>(null)
const viewCreate = ref<boolean>(false)
const multiplayer = ref<boolean>(false)

onMounted(async () => {
  // Initialize game identifiers when the component is mounted
  const dataGame = await initGameIdentifiers()

  if (!dataGame) {
    console.error('Failed to initialize game identifiers')
    return
  }
  const { player, code } = dataGame

  playerId.value = player
  gameId.value = code
})

const changeDifficulty = (difficulty: any) => setDifficulty(difficulty.val)
const changeLevel = (level: any) => setLevel(level.val)

const changeNumPlayers = (numPlayers: any) => {
  multiplayer.value = numPlayers.val === '2' ? true : false

  if (numPlayers.val === '1') {
    viewCreate.value = false
    viewJoin.value = false
  }

  setIsMultiplayer(multiplayer.value)
}

const showCopied = ref(false)
const isHighlighted = ref(false)

const copygameId = async () => {
  try {
    await navigator.clipboard.writeText(gameId.value)
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

const handleJoin = () => (viewJoin.value = !viewJoin.value)
const joinGame = () => joinToTheGame(codeGame.value)

const handleCreate = async () => {
  viewCreate.value = !viewCreate.value
}
</script>

<template>
  <div class="mb-8 mx-auto min-h-[7rem]">
    <div
      v-if="!game.gameStarted"
      class="flex items-start justify-between">
      <div class="flex flex-col items-start justify-center gap-4">
        <div class="flex items-start gap-2 w-full">
          <Select
            :items="itemsDifficulty"
            :defaultPosition="0"
            icon="⏱️"
            @selected="changeDifficulty" />

          <Select
            title="Nivel"
            :items="itemsLevel"
            :defaultPosition="0"
            icon="level"
            @selected="changeLevel" />

          <Select
            :items="itemsNumPlayers"
            :defaultPosition="0"
            icon=""
            @selected="changeNumPlayers" />

          <div class="flex justify-center items-center gap-2 w-[230px]">
            <button
              v-if="!viewJoin && !viewCreate"
              @click="handleJoin"
              :disabled="!multiplayer"
              class="w-fit text-[#fdfdfd] bg-black/60 rounded-lg py-[0.5rem] outline-none px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-40">
              <small>UNIRSE</small>
            </button>
            <div
              v-if="viewJoin && !viewCreate"
              class="flex flex-col items-center relative">
              <div class="flex items-center">
                <input
                  type="text"
                  v-model="codeGame"
                  class="w-[220px] text-[#fdfdfd] bg-black/60 rounded-lg p-[0.3rem] outline-none px-2 text-[0.9rem]" />
              </div>
              <small class="text-white absolute bottom-0 -mb-[18px] [text-shadow:0_0_4px_black]">pega el código aquí</small>
            </div>

            <button
              v-if="!viewJoin && !viewCreate"
              @click="handleCreate"
              :disabled="!multiplayer"
              class="w-fit text-[#fdfdfd] bg-black/60 rounded-lg py-[0.5rem] outline-none px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-40">
              <small>CREAR</small>
            </button>
            <div
              v-if="!viewJoin && viewCreate"
              class="flex flex-col items-center relative">
              <div class="flex items-center">
                <div
                  class="w-[220px] text-[#fdfdfd] rounded-lg p-[0.4rem] outline-none px-2 text-[0.9rem] transition-colors duration-300"
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
              <small class="text-white absolute bottom-0 -mb-[18px] [text-shadow:0_0_4px_black]">comparte este código</small>
            </div>
          </div>
        </div>
      </div>

      <BtnGameStart v-if="!viewJoin" />
      <BtnGameJoin
        v-else
        @click="joinGame" />
    </div>
  </div>
</template>
