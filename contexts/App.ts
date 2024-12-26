import { createContext } from "react";


const initialValue = {
	filterCharacters: 'all',
	setFilterCharacters: (filterValue: string) => {},
	
	filterSpecie: 'all',
	setFilterSpecie: (filterValue: string) => {},
	
	isFavorite: (characterId: number) : boolean => false,
	addFavorite: (characerId: number) => {},
	removeFavorite: (characerId: number) => {},
	
	textSearch: '',
	setTextSearch: (text: string) => {}
}

export default createContext(initialValue)