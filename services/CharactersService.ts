import { CharacterFilter, getCharacters } from "rickmortyapi"

export default class CharactersService {
	
	/**
	 * Request the characters to the API
	 * @param filter 
	 * @returns 
	 */
	async getCharacters(filter: CharacterFilter) {
		return await getCharacters(filter)
	}
	
}