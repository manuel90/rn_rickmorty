//React
import { useContext, useEffect, useState } from "react"

//RN components
import { ScrollView, SafeAreaView, StyleSheet } from "react-native"

//Expo
import { Stack } from "expo-router"

//RickMorty API
import { type Character, CharacterFilter } from "rickmortyapi"

//Components
import ListCharacters from "@/components/ListCharacters"
import ThemedView from "@/components/ThemedView"
import ThemedText from "@/components/ThemedText"
import SearchList from "@/components/SearchList"
import ThemedOutlineButton from "@/components/ThemedOutlineButton"

//Services
import { myCharactersService } from "@/services"

//Tailwind
import tw from "twrnc"

//Context
import AppContext from "@/contexts"


export default function HomeScreen() {
  
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  
  const { 
		textSearch,
	} = useContext(AppContext)
	
  /**
   * This function loads the characters.
   * @param paged 
   * @returns 
   */
	const loadCharacters = async (paged = 1, listCharacters: Character[] = []) => {
		try {
      
      if(isLoading) {
        return
      }
      setIsLoading(true)
      const filter: CharacterFilter = { page: paged }
      if(textSearch) {
        filter.name = textSearch
      }
			
      const resultJson = await myCharactersService.getCharacters(filter)
      
      setTotalPages(resultJson.data.info?.pages ? resultJson.data.info?.pages : 0)
			setCharacters(resultJson.data.results ? [...listCharacters, ...resultJson.data.results] : [])
			
      setIsLoading(false) 
		} catch(error) {
      setTotalPages(0)
			setCharacters([])
      setIsLoading(false) 
		}
	}
	
  useEffect(() => {
    loadCharacters(1, [])
  }, [])
  
	useEffect(() => {
    if(page > 1) {
      loadCharacters(page, characters)
    }
	}, [page])
  
  
  useEffect(() => {
    if(textSearch) {
      if(page !== 1) {
        setPage(1)
      }
      loadCharacters(1, [])
    }
	}, [textSearch])
  
  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView>
        <ScrollView>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />
          <ThemedText testID="mainTitle" style={styles.mainTitle} type="title">Rick and Morty list</ThemedText>
          <SearchList />
          <ListCharacters 
            isLoading={isLoading} 
            showLoadingAtEnd={true}
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
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  mainTitle: {
    marginVertical: 20,
  },
})

