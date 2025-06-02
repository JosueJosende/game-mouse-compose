import { atom } from 'nanostores'
import { nanoid } from 'nanoid'
import type { GameState, Letter } from '@/types/type-game'


// Estado inicial del juego
const initialState: GameState = {
  gameId: '', // Se inicializa vacío
  playerId: '', // Se inicializa vacío
  difficulty: 'easy',
  level: 1,
  timeLeft: 120, // 2 minutes default
  playerCount: 1,
  isMultiplayer: false,
  gameStarted: false,
  gameOver: false,
  letters: [],
  selectedLetters: [],
  foundWords: [],
  score: 0,
  eventSource: null,
  opponentScore: 0,
  opponentWords: [],
  joined: false,
  originalIdGame: ''
}

// Crea el store de juego
export const gameStore = atom<GameState>(initialState)

// Inicializa los valores aleatorios solo en el cliente
export async function initGameIdentifiers() {
  const player = nanoid(8)
  const code = nanoid(16).toUpperCase()

  if (typeof window !== 'undefined') {
    gameStore.set({
      ...gameStore.get(),
      playerId: player,
      gameId: code,
      originalIdGame: code
    });
  }

  const newGame = await createGame() // Crea el juego al iniciar

  if (!newGame) {
    console.error('Error creating the game on initialization');
    return false
  }

  return { player, code }
}

// Crea un nuevo juego
export async function createGame() {
  const setGame = await fetch('/api/game/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameStore.get().gameId,
      playerId: gameStore.get().playerId,
      timeLeft: gameStore.get().timeLeft,
      difficulty: gameStore.get().difficulty,
      level: gameStore.get().level,
      playerCount: gameStore.get().playerCount,
      isMultiplayer: gameStore.get().isMultiplayer
    })
  })

  if (!setGame.ok) {
    console.error('Error creating the game:', setGame.statusText)
    return false
  }

  const propertiesGames = await setGame.json()
  if (!propertiesGames) {
    console.error('Error creating the game:', propertiesGames)
    return false
  }

  return true
}

export async function updateGame(propertiesGame: Partial<GameState>) {
  const setUpdated = await fetch('/api/game/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ propertiesGame })
  })

  if (!setUpdated.ok) {
    console.error('Error updating the game:', setUpdated)
    return false
  }

  const { success } = await setUpdated.json()
  if (!success) {
    console.error('Error updating the game:', success)
    return false
  }

  gameStore.set({
    ...gameStore.get(),
    ...propertiesGame
  })

  console.log('Game updated successfully:', propertiesGame);
  

  return true
}

// Establece al jugador como el jugador 2
export async function joinToTheGame(code: string) {
  const gameId = code
  const playerId = gameStore.get().playerId

  const setJoined = await fetch('/api/game/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      gameId,
      playerId
    })
  });

  if (!setJoined.ok) {
    console.error('Error joining the game:', setJoined.statusText);
    return;
  }
  const joinedData = await setJoined.json()

  if (!joinedData.success) {
    console.error('Error joining the game:', joinedData.message);
    return;
  }

  // recuperar el juego y acutaliar con el joinedData.data
  const gameData = joinedData.data

  gameStore.set({
    ...gameStore.get(),
    timeLeft: gameData.timeLeft,
    difficulty: gameData.difficulty,
    level: gameData.level,
    playerCount: gameData.playerCount,
    isMultiplayer: gameData.isMultiplayer,
    gameStarted: true,
    gameId: gameData.gameId,
    joined: true,
  })
  

  // Actualiza el estado del juego
  /* gameStore.set({
    ...gameStore.get(),
    playerCount: 2,
    isMultiplayer: true,
    gameId: code
  }) */
  
    const eventSource = new EventSource(`/api/game/start?gameId=${gameId}&playerId=${playerId}`)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const currentGame = gameStore.get()

      if (data.type === 'waitPlayers') {
        /* gameStore.set({
          ...currentGame,
          gameStarted: true,
          eventSource
        }); */
      } else if (data.type === 'allReadyPlayers') {
      } else if (data.type === 'initGame') {
        console.log('Game initialized:', data.game)

        /* gameStore.set({
          ...currentGame,
          ...data.propertiesGame
        }); */
      } else if (data.type === 'game-ready') {
        console.log('Game is ready to start:', data)
        gameStore.set({
          ...currentGame,
          gameStarted: true,
          letters: data.letters,
          timeLeft: data.timeLeft,
          score: data.points,
          eventSource
        })
      } else if (data.type === 'game-over') {
        console.log('Game over:', data)
        gameStore.set({
          ...currentGame,
          gameOver: true,
          gameStarted: false,
          letters: [],
          selectedLetters: [],
          opponentScore: currentGame.joined ? data.points[0] : data.points[1],
          joined: false,
          // opponentWords: data.words,
          eventSource: null
        })
      }
    }

    eventSource.onerror = (error) => {
      console.error('Error in EventSource:', error)
      eventSource.close()
    }
  
}

// Inicia el juego, teniendo en cuenta si hay que esperar al segundo jugador o unirse a uno existente o jugar solo
export async function startGame() {
  const { gameId, playerId } = gameStore.get()
  const eventSource = new EventSource(`/api/game/start?gameId=${gameId}&playerId=${playerId}`)

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const currentGame = gameStore.get()
    
    if (data.type === 'wait-players') {
      /* gameStore.set({
        ...currentGame,
        gameStarted: true,
        eventSource
      }); */
    } else if (data.type === 'allReadyPlayers') {

    } else if (data.type === 'initGame') {
      console.log('Game initialized:', data.game);
      
      /* gameStore.set({
        ...currentGame,
        ...data.propertiesGame
      }); */

    } else if (data.type === 'game-ready') {
      console.log('Game is ready to start:', data);
      gameStore.set({
        ...currentGame,
        gameStarted: true,
        letters: data.letters,
        timeLeft: data.timeLeft,
        score: data.points,
        eventSource
      })
      
    } else if (data.type === 'game-over') {
      console.log('Game over:', data)
      gameStore.set({
        ...currentGame,
        gameOver: true,
        gameStarted: false,
        letters: [],
        selectedLetters: [],
        opponentScore: currentGame.joined ? data.points[0] : data.points[1],
        joined: false,
        // opponentWords: data.words,
        eventSource: null
      })
    }
  }

  eventSource.onerror = (error) => {
    console.error('Error in EventSource:', error);
    eventSource.close();
  }
}

export async function resetGame() {
  const currentState = gameStore.get()
  const resetState: GameState = {
    ...initialState,
    gameId: currentState.originalIdGame, 
    playerId: currentState.playerId, // Mantiene el mismo playerId
    difficulty: currentState.difficulty, // Mantiene la dificultad actual
    level: currentState.level, // Mantiene el nivel actual
  }
  gameStore.set(resetState)
  try {
    const propertiesGames = await updateGame(resetState)
  } catch (error) {
    console.error('Error resetting game:', error);
  }
  /* gameStore.set(resetState) */
}


// Eventos del juego
// Establecer el tiempo de duración del juego
export async function setDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
  console.log('Saving difficulty:', difficulty);
  
  const timeMap = {
    'easy': 180, // 3 minutes
    'medium': 120, // 2 minutes
    'hard': 60 // 1 minute
  }

  try {
    const propertiesGames = await updateGame({
      ...gameStore.get(),
      difficulty,
      timeLeft: timeMap[difficulty]
    })
  } catch (error) {
    console.error('Error updating game difficulty:', error);
  }

  /* gameStore.set({
    ...gameStore.get(),
    difficulty,
    timeLeft: timeMap[difficulty]
  }); */

}

export async function setIsMultiplayer(isMultiplayer: boolean) {
  try {
    const propertiesGames = await updateGame({
      ...gameStore.get(),
      isMultiplayer
    });
  } catch (error) {
    console.error('Error updating game multiplayer status:', error);
  }
  /* gameStore.set({
    ...gameStore.get(),
    isMultiplayer
  }); */
}

// Modifica el nivel del juego
export async function setLevel(level: number) {
  try {
    const propertiesGames = await updateGame({
      ...gameStore.get(),
      level
    });
  } catch (error) {
    console.error('Error updating game level:', error);
  }
  /* gameStore.set({
    ...gameStore.get(),
    level
  }); */
}

let oldIndexLetter: number | null = null
export function selectLetter(letter: Letter) {
  const currentState = gameStore.get()
  const selectedLetters = [...currentState.selectedLetters]

  // Check if letter is already selected
  const letterIndex = selectedLetters.findIndex((l) => l.id === letter.id)

  if (letterIndex !== -1) {
    // Al hacer click en la últma letra, esta se elimina
    if (letterIndex === selectedLetters.length - 1) {
      selectedLetters.pop()
      oldIndexLetter = selectedLetters.length > 0 ? selectedLetters[selectedLetters.length - 1].index : 0
    } else {
      selectedLetters.splice(letterIndex)
      oldIndexLetter = selectedLetters.length > 0 ? selectedLetters[selectedLetters.length - 1].index : 0
    }
  } else if ((oldIndexLetter !== null && validateNextLetter(oldIndexLetter, letter)) || selectedLetters.length === 0) {
    oldIndexLetter = letter.index
    // Add letter to selection
    selectedLetters.push({
      ...letter
      // index: selectedLetters.length
    })
  } else {
    return
  }

  gameStore.set({
    ...currentState,
    selectedLetters
  })
}

function validateNextLetter(currentLetter: number, nextLetter: Letter): boolean {
  // Check if the next letter is adjacent to the current letter
  const { id, index } = nextLetter
  const [_, lin, col] = id.split('-')
  const line = Number(lin)

  const impar = Math.floor(line) % 2 === 0 ? false : true

  if (currentLetter === index + 1 || currentLetter === index - 1) {
    return true
  } else if (impar && (currentLetter + 9 === index || currentLetter - 11 === index || currentLetter + 10 === index || currentLetter - 10 === index)) {
    return true
  } else if (!impar && (currentLetter - 10 === index || currentLetter + 10 === index || currentLetter - 9 === index || currentLetter + 11 === index)) {
    return true
  } else {
    return false
  }
}

export function clearSelection() {
  const currentState = gameStore.get()
  gameStore.set({
    ...currentState,
    selectedLetters: []
  })
}

export function submitWord() {
  const currentState = gameStore.get()
  const word = currentState.selectedLetters.map((l) => l.letter).join('')

  if (word.length < 3) return

  fetch('/api/game/submit-word', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      word,
      playerId: currentState.playerId,
      gameId: currentState.gameId
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.valid) {
        // Word is valid, add to found words
        if (!currentState.foundWords.some((w) => w.word === word)) {
          gameStore.set({
            ...currentState,
            selectedLetters: [],
            foundWords: [...currentState.foundWords, { word, points: data.points }],
            score: currentState.score + data.points
          })
        } else {
          // Word already found
          gameStore.set({
            ...currentState,
            selectedLetters: []
          })
        }
      } else {
        // Invalid word
        gameStore.set({
          ...currentState,
          selectedLetters: []
        })
      }
    })
    .catch((error) => {
      console.error('Failed to submit word:', error)
    })
}