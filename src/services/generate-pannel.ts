import type { Letter } from '@/types/type-game'
import { letterFrequencies, lengthPannel } from '@/constants/constants'

export function generateLetterGrid(difficulty: string, level: string): Letter[][] {
  const letters = []
  const useIds = new Set<string>()

  const numLevel = Number(level)
  //console.log(typeof level);

  const letterPool = []
  const selectedFrequencies =
    // difficulty === 'easy' ? letterFrequencies.easy :
    numLevel === 1 ? letterFrequencies.easy :
    // difficulty === 'medium' ? letterFrequencies.medium :
    numLevel === 2 ? letterFrequencies.medium :
    letterFrequencies.hard

  for (const [letter, frequency] of Object.entries(selectedFrequencies)) {
    for (let i = 0; i < frequency; i++) {
      letterPool.push(letter)
    }
  }

  const sizePannel = numLevel === 1 ? 'easy' : numLevel === 2 ? 'medium' : 'hard'

  const shuffled = shuffle(letterPool)
  const [rows, columns] = lengthPannel[sizePannel as keyof typeof lengthPannel]

  for (let i = 0; i < rows; i++) {
    const row: Letter[] = []
    const lettersInRow = i % 2 === 0 ? rows : columns

    for (let j = 0; j < lettersInRow; j++) {
      const id = `letter-${i}-${j}`

      if(!useIds.has(id)) {
        useIds.add(id)
        
        const letterIndex = Math.floor(Math.random() * shuffled.length)
        const letter = shuffled[letterIndex]

        shuffled.splice(letterIndex, 1) // Remove the letter from the pool

        const [_, lin, col] = id.split('-')

        row.push({
          id: id,
          letter: letter,
          index: Number(lin+col)
        })
      }
    }

    letters.push(row)
  }

  return letters
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}