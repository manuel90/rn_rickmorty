//React
import { useContext, useEffect, useState } from "react";

//Modules
import { Character } from 'rickmortyapi'

//RN components
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";

//Components
import ItemCharacter from "@/components/ItemCharacter";
import ThemedText from "@/components/ThemedText";

//Constants
import { Colors, Radius } from "@/constants";

//Tailwind
import tw from "twrnc";

//Interfaces & types
import { ListCharactersProps } from "@/types";

//Context
import AppContext from "@/contexts";

//Utils
import { pluralText } from "@/utils";

//Assets
const sortAZ = require("./assets/sort_az.png")
const sortZA = require("./assets/sort_za.png")


export default function ListCharacters({ characters, isLoading, showResults = false, showLoadingAtEnd = false, showSort = true }: ListCharactersProps) {
	
	const { 
		filterSpecie,
		filterCharacters,
		isFavorite,
	} = useContext(AppContext)
	
	const [isSortAsc, setIsSortAsc] = useState(false)
	const [stateCharacters, setStateCharacters] = useState([...characters])
	
	
	useEffect(() => {
		const compareSortName = (a: Character, b: Character) => {
			return isSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
		}
		characters.sort(compareSortName)
		setStateCharacters([...characters])
	}, [isSortAsc, characters, characters.length])
	
	if(isLoading && !showLoadingAtEnd) {
		return (
			<>
				<ActivityIndicator />
			</>
		)
	}
	
	if(!(characters.length) && !isLoading) {
		return (
			<>
				<ThemedText style={tw`text-center`} type="subtitle">- No results -</ThemedText>
			</>
		)
	}
	
	
	const starredCharacters = stateCharacters.filter((character: Character) => isFavorite(character.id))
	const noStarredCharacters = stateCharacters.filter((character: Character) => !isFavorite(character.id))
	
	let nFilters = filterCharacters !== 'all' ? 1 : 0
	if(filterSpecie !== 'all') {
		nFilters++
	}
	
	return (
		<>
			{
				showResults && (
					<View style={styles.wrapShowResults}>
						<ThemedText style={styles.labelNResults} numberOfLines={1}>{pluralText(characters.length, '1 Result', `${characters.length} Results`)}</ThemedText>
						<ThemedText style={styles.labelNFilters} numberOfLines={1}>{pluralText(nFilters, '1 Filter', `${nFilters} Filters`)}</ThemedText>
					</View>
				)
			}
			
			{
				starredCharacters.length > 0 && (
				<View>
					<View style={styles.wrapListingHeading}>
						<ThemedText style={styles.listHeading}>STARRED CHARACTERS ({starredCharacters.length})</ThemedText>
						{
							showSort && (
								<View style={styles.wrapShowResults}>
									<TouchableOpacity
										style={styles.sortTouch}
										onPress={() => {
											setIsSortAsc(!isSortAsc)
										}}
									>
										<Image 
											style={styles.sortImage}
											source={isSortAsc ? sortZA : sortAZ}
										/>
									</TouchableOpacity>
								</View>
							)
						}
					</View>
					{
						starredCharacters.map((starredCharacter: Character, indexItem: number) => (
							<ItemCharacter key={`starredCharacter${indexItem}`} character={starredCharacter} />
						))
					}
				</View>
				)
			}
			{
				noStarredCharacters.length > 0 && (
					<View>
						<View style={styles.wrapListingHeading}>
							<ThemedText style={styles.listHeading}>CHARACTERS ({noStarredCharacters.length})</ThemedText>
							{
								showSort && (
									<View style={styles.wrapShowResults}>
										<TouchableOpacity
											style={styles.sortTouch}
											onPress={() => {
												setIsSortAsc(!isSortAsc)
											}}
										>
											<Image 
												style={styles.sortImage}
												source={isSortAsc ? sortZA : sortAZ}
											/>
										</TouchableOpacity>
									</View>
								)
							}
						</View>
						{
							noStarredCharacters.map((itemCharacter: Character, indexItem: number) => (
								<ItemCharacter key={`itemCharacter${indexItem}`} character={itemCharacter} />
							))
						}
					</View>
				)
			}
			{
				isLoading && showLoadingAtEnd && (
					<ActivityIndicator />
				)
			}
		</>
	)
}


const styles = StyleSheet.create({
	wrapShowResults: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	labelNResults: {
		color: Colors.purple2Text,
		paddingVertical: 5,
	},
	labelNFilters: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: Colors.greenBg,
		borderRadius: Radius.md,
		backgroundColor: Colors.greenBg,
		color: Colors.greenText,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	wrapListingHeading: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.borderGray,
		borderStyle: 'solid',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	sortTouch: {
		
	},
	sortImage: {
		resizeMode: 'contain',
		height: 20,
		width: 20,
	},
	listHeading: {
		color: Colors.grayText,
		fontWeight: 700,
		paddingTop: 25,
		paddingBottom: 15,
	},
})