<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore, initGameIdentifiers, setIsMultiplayer } from '@/stores/gameStore'

import CandleTimer from '@/components/ui/CandleTimer.vue'
import PointsPlayer from '@/components/ui/PointsPlayer.vue'
import Select from '@/components/ui/Select.vue'
import BtnTime from '@/components/ui/BtnTime.vue'
import BtnGameStart from '@/components/ui/BtnStartGame.vue'
import BtnGameJoin from '@/components/ui/BtnStartJoin.vue'
import BtnLevel from '@/components/ui/BtnLevel.vue'
import CodeCreateGame from '@/components/ui/CodeCreateGame.vue'
import JoinToGame from '@/components/ui/JoinToGame.vue'

const game = useStore(gameStore)
const timeLeft = ref(game.value.timeLeft)
const score = ref(game.value.score)
const viewRuleTime = ref(true)
const viewRuleLevel = ref(false)
const viewRuleSinglePlayer = ref(false)
const viewRuleMultiplayer = ref(false)
const playerId = ref(null)
const gameId = ref(null)
const textBtnJoin = ref('INICIAR JUEGO')

const viewJoin = ref(false)

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

const viewRuleGame = (option: any) => {
  viewRuleTime.value = false
  viewRuleLevel.value = false
  viewRuleSinglePlayer.value = false
  viewRuleMultiplayer.value = false

  if (option.val === '1') viewRuleTime.value = true
  if (option.val === '2') viewRuleLevel.value = true
  if (option.val === '3') {
    viewRuleSinglePlayer.value = true
    setIsMultiplayer(false)
  }
  if (option.val === '4') {
    viewRuleMultiplayer.value = true
    setIsMultiplayer(true)
  }
}

const iconsmenu: Array<{ name: string; val: string }> = [
  {
    name: 'M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z',
    val: '1'
  },
  {
    name: 'M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5 M4 15l8 4l8 -4 M12 11v-7 M9 7l3 -3l3 3',
    val: '2'
  },
  {
    name: 'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0 M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2',
    val: '3'
  },
  {
    name: 'M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85 ',
    val: '4'
  }
]

watch(game, (newGame: typeof game.value) => {
  score.value = newGame.score
  timeLeft.value = newGame.timeLeft
})

const handleJoin = (status) => {
  //console.log('handleJoin status:', status, status.length)

  if (status === 'focus' && status.length <= 5) {
    viewJoin.value = true
    textBtnJoin.value = '...CODIGO JUEGO'
  } else if (status.length > 6) {
    viewJoin.value = true
    textBtnJoin.value = 'UNIRSE AL JUEGO'
    gameId.value = status
  } else {
    viewJoin.value = false
    textBtnJoin.value = 'INICIAR JUEGO'
  }
}
</script>

<template>
  <div
    v-if="!game.gameStarted"
    class="game-card h-full flex flex-col gap-2 items-center justify-between">
    <Select
      :items="iconsmenu"
      :defaultPosition="0"
      icon=""
      @selected="viewRuleGame" />

    <div
      v-show="viewRuleTime"
      class="flex flex-col items-center space-y-4 h-full">
      <small class="text-center text-white/90 [text-shadow:0_0_4px_black]">Selecciona el tiempo que deseas que dure la partida</small>
      <div class="flex flex-col justify-around h-full items-center space-y-4 w-full max-w-xs max-h-[250px]">
        <BtnTime
          :time="[59, 120, 180]"
          :text="['1 MIN', '2 MIN', '3 MIN']" />
      </div>
    </div>

    <div
      v-show="viewRuleLevel"
      class="flex flex-col items-center space-y-4 h-full">
      <small class="text-center text-white/90 [text-shadow:0_0_4px_black]">Selecciona el nivel de dificultad</small>
      <div class="flex flex-col justify-around h-full items-center space-y-4 w-full max-w-xs max-h-[250px]">
        <BtnLevel />
      </div>
    </div>

    <div
      v-show="viewRuleSinglePlayer"
      class="flex flex-col items-center space-y-4 h-full">
      <small class="text-center text-white/90 [text-shadow:0_0_4px_black]">Un jugador</small>
      <div class="text-white text-center [text-shadow:0_0_4px_black]">Solo has de configurar el tamaño del tablero y el tiempo de la partida.</div>
      <div class="text-white text-center [text-shadow:0_0_4px_black]">Presiona el botón de INICIAR JUEGO para empezar a jugar!</div>
    </div>

    <div
      v-show="viewRuleMultiplayer"
      class="flex flex-col items-center space-y-4 h-full">
      <small class="text-center text-white/90 [text-shadow:0_0_4px_black]"
        >Multijugador <br />
        Crear una partida o unete a una partida existente.</small
      >
      <div class="text-[#ffe4c4] text-center [text-shadow:0_0_4px_black] pt-6">
        CREA UNA NUEVA PARTIDA
        <CodeCreateGame :gameId="gameId" />
      </div>

      <hr class="border-collapse border-white/50 w-full" />

      <div class="text-[#ffe4c4] text-center [text-shadow:0_0_4px_black]">
        UNIRSE A UNA PARTIDA
        <JoinToGame @status="handleJoin" />
      </div>
    </div>
    <!-- Boton Inicio partida -->
    <div class="w-full">
      <BtnGameStart v-if="!viewJoin" />
      <BtnGameJoin
        v-else
        :gameId="gameId"
        :msg="textBtnJoin" />
    </div>
  </div>
  <div
    v-else
    class="game-card h-full flex flex-col items-center justify-between max-h-[480px]">
    <PointsPlayer :points="score" />
    <img
      class="w-[71%]"
      src="./compose-mouse.png"
      alt="mascota" />
    <CandleTimer :duration="timeLeft" />
  </div>
</template>
