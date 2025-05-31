export interface Letter {
  id: string
  letter: string
  index: number
}

export interface Word {
  word: string
  points: number
}

export interface GameState {
  gameStarted: boolean
  gameOver: boolean
  letters: Letter[][]
  selectedLetters: Letter[]
  foundWords: Word[]
  difficulty: 'easy' | 'medium' | 'hard'
  level: number
  timeLeft: number
  score: number
  playerCount: number
  playerId: string
  gameId: string
  eventSource: EventSource | null
  isMultiplayer: boolean
  opponentScore: number
  opponentWords: Word[]
  joined: boolean
}
