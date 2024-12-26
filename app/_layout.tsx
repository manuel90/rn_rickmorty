//React
import { useState } from 'react';

//Expo
import { Stack } from 'expo-router';

//Context
import AppContext from "@/contexts";

export default function Layout() {
	
	const [filterCharacters, setFilterCharacters] = useState('all')
	const [filterSpecie, setFilterSpecie] = useState('all')
	const [idsFavorites, setIdsFavorites] = useState<number[]>([])
	const [textSearch, setTextSearch] = useState('')
	
	const contextApp = {
		textSearch,
		setTextSearch,
		
		filterCharacters,
		setFilterCharacters,
		
		filterSpecie,
		setFilterSpecie,
		isFavorite: (characterId: number) => {
			return idsFavorites.indexOf(characterId) !== -1
		},
		addFavorite: (characerId: number) => {
			if(idsFavorites.indexOf(characerId) === -1) {
				idsFavorites.push(characerId)
				setIdsFavorites([...idsFavorites])
			}
		},
		removeFavorite: (characerId: number) => {
			const indexFound = idsFavorites.indexOf(characerId)
			if(indexFound !== -1) {
				idsFavorites.splice(indexFound, 1)
				setIdsFavorites([...idsFavorites])
			}
		},
	}
	
  return (
		<AppContext.Provider value={contextApp}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTintColor: '#000',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerShadowVisible: false,
				}}
			/>
		</AppContext.Provider>
  );
}
