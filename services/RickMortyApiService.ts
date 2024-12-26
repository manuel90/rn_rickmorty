import { Character, getCharacters, Info } from "rickmortyapi"

/**
 * This service is used to apply the filter by specie and starred to all the characters. (This should be implemented in the API)
 */
export default class RickMortyApiService {
	
	totalPages: number = 0
	fullList: Character[] = []
	
	
	async startLoadAllCharacters() {
		this.totalPages = await this.getTotalPages()
		
		await this.loadAllDataCharacters()
		
	}
	
	
	async getTotalPages() {
		try {
			const resultJson = await getCharacters()
			const resultData: Info<Character[]> = resultJson.data
			return resultData.info ? resultData.info.count : 0
		} catch(error) {
			return 0
		}
	}
	
	
	async loadAllDataCharacters(page = 1) {
		try {
			
			if(page > this.totalPages) {
				return
			}
			
			const resultJson = await getCharacters({
				page,
			})
			const resultData: Info<Character[]> = resultJson.data
			
			if(resultData.results) {
				this.fullList = [ ...this.fullList, ...resultData.results]
			}
			await this.loadAllDataCharacters(page + 1)	
		} catch(error) {
		}
	}
	
	getFullList() {
		return this.fullList
	}
}
