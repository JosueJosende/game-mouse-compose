interface Game {
  gameId: string
  gameStarted: boolean
  players: string[]
  letters: any[][]
  timeLeft: number
  difficulty: string
  playerCount: number
  isMultiplayer: boolean
  level: number
  foundWords: string[]
  startTime: number
  active: boolean
  points: number[]
}


let activeGames: Game[] = []

export function getActiveGames(): Game[] {
  // Clean up inactive games older than 30 minutes
  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000
  activeGames = activeGames.filter((game) => game.active || game.startTime > thirtyMinutesAgo)

  return activeGames
}

export async function createGame(game: Game): Promise<string> {
  activeGames.push(game)

  return game.gameId
}

export function updateGame(updatedGame: Game): void {
  const index = activeGames.findIndex((g) => g.gameId === updatedGame.gameId)
  if (index !== -1) {
    activeGames[index] = updatedGame
  }
}

export function removeGame(gameId: string): void {
  activeGames = activeGames.filter((g) => g.gameId !== gameId)
}

export function statusGame(gameId: string): void {
  const game = activeGames.find((g) => g.gameId === gameId)
}

export function gameOver(gameId: string): void {
  const game = activeGames.find((g) => g.gameId === gameId)
  if (game) {
    game.active = false
    game.letters = []
    game.foundWords = []
    game.points = []
    game.timeLeft = 0
    game.gameStarted = false
    game.isMultiplayer = false
    game.difficulty = 'easy'
    updateGame(game)
  }
}