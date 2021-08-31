import { lorem } from 'faker'

/**
 * Make a random number of words
 * @param numberOfWords the number of words to input
 * @returns string
 */

export const makeRandomWords = (numberOfWords?: number): string => {
    numberOfWords = numberOfWords || Math.floor(Math.random()* 5) + 1
    const result = lorem.words(numberOfWords)
    return result
}

/**
 * Chooses a random item from an array
 * @param items items as an array of <T>
 * @returns one item at random <T>
 */
export const chooseRandomItem = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)]
}