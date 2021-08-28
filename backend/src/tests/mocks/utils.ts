import { lorem } from 'faker'

/**
 * Make a random number of words
 * @param numberOfWords the number of words to input
 * @returns string
 */
export const makeRandomWords = (numberOfWords = 0): string => {
    const wordAmount = numberOfWords >= 0 ? numberOfWords : Math.floor(Math.random()* 5) + 1

    const result = lorem.words(wordAmount)
    return result
}