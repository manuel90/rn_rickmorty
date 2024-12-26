//React
import { useContext, useEffect, useState } from "react"

//Expo
import { Stack, useNavigation } from "expo-router"

//RN components
import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native"


//Components
import ThemedView from "@/components/ThemedView"
import BackLeftButton from "@/components/BackLeftButton"
import ThemedOutlineButton from "@/components/ThemedOutlineButton"
import ListCharacters from "@/components/ListCharacters"
import ThemedText from "@/components/ThemedText"

//Services
import { myCharactersService } from "@/services"

//RickMorty API
import { type Info, type Character, type CharacterFilter } from "rickmortyapi"

//Tailwind
import tw from "twrnc"

//Context
import AppContext from "@/contexts"




export default function AdvancedSearch() {
	
	const navigation = useNavigation();
	
	const { 
		filterSpecie,
		filterCharacters,
		isFavorite,
	} = useContext(AppContext)
	
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
	
	const [characters, setCharacters] = useState<Character[]>([])
	
	
	/**
	 * This function is used to apply the filter by specie and starred
	 * @param listCharacters 
	 * @returns 
	 */
	const applyFilter = (listCharacters: Character[]) => {
		const newResults = listCharacters.filter((itemCharacter: Character) => {
			let condition = true
			if(filterSpecie !== 'all') {
				if(filterSpecie === 'human') {
					condition = condition && itemCharacter.species === 'Human'
				} else {
					condition = condition && itemCharacter.species !== 'Human'
				}
			}
			
			if(filterCharacters !== 'all') {
				if(filterCharacters === 'starred') {
					condition = condition && isFavorite(itemCharacter.id)
				} else {
					condition = condition && !isFavorite(itemCharacter.id)
				}
			}
			return condition
		})
		
		const newPaginationData: Info<Character[]> = {
			info: {
				count: newResults.length,
				pages: 1,
				next: null,
				prev: null,
			},
			results: newResults,
		}
		return newPaginationData
	}
	
	
	/**
	 * This function loads the characters.
	 * @param paged 
	 * @returns 
	 */
	const loadCharacters = async (paged = 1) => {
		try {
			
			if(isLoading) {
				return
			}
			setIsLoading(true)
			
			const filter: CharacterFilter = {
				page: paged,
			}
			
			if(filterSpecie === 'human') {
				filter.species = filterSpecie
			}
			
			const resultJson = await myCharactersService.getCharacters(filter)
			
			const resultData: Info<Character[]> = resultJson.data
      
			setTotalPages(resultData.info?.pages ? resultData.info?.pages : 0)
			
			if((filterSpecie === 'all' && filterCharacters === 'all') || (filterSpecie === 'human' && filterCharacters === 'all')) {
				setCharacters(resultData.results ? [...characters,...resultData.results] : [])
			} else {
				
				/**
				 * TODO: Implement a best solution to filter all the results paginated.
				 *			await myRickMortyApiService.startLoadAllCharacters()
				 */
				
				const resultPagination = applyFilter(resultData.results ? resultData.results : [])
				
				setCharacters(resultPagination.results ? [...characters,...resultPagination.results] : [])
			}
			
			setIsLoading(false)
		} catch(error) {
			setCharacters([])
			setIsLoading(false)
		}
	}
	
	useEffect(() => {
		loadCharacters(page)
	}, [page])
		
	
  return (
    <ThemedView style={tw`flex-1`}>
			<ScrollView>
        <SafeAreaView>
					<Stack.Screen
						options={{
							headerLeft: () => <BackLeftButton />,
							headerTitle: () => <ThemedText>Advanced search</ThemedText>,
							headerRight: () => (
								<ThemedOutlineButton 
									onPress={() => {
										if(navigation.canGoBack()) {
											navigation.goBack()
										}
									}}
									disabled={false}
									text="Done"
								/>
							),
						}}
					/>
					<View>
						<ListCharacters 
							showResults={true} 
							isLoading={isLoading} 
							characters={characters} 
						/>
						{
							(page < totalPages && characters.length > 0 && !isLoading) && (
								<ThemedOutlineButton
									onPress={() => {
										setPage(page + 1)
									}}
									text="Load more"
								/>
							)
						}
					</View>
        </SafeAreaView>
			</ScrollView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
	wrapImage: {
		position: 'relative',
	},
	wrapHeart: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#fff',
		backgroundColor: '#fff',
		borderRadius: '50%',
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 70,
		height: 35,
		width: 35,
	},
	touchHeart: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	heart: {
		resizeMode: 'contain',
		width: '70%',
	},
})
