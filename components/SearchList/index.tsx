//React
import { useContext, useEffect, useRef, useState } from "react"

//RN components
import { Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

//Hooks
import { router } from "expo-router"

//Modules
import RBSheet from 'react-native-raw-bottom-sheet'

//Components
import ThemedText from "@/components/ThemedText"
import GroupFilter from "@/components/GroupFilter"
import ThemedView from "@/components/ThemedView"
import ThemedButton from "@/components/ThemedButton"

//Contants
import { Colors, Radius } from "@/constants"

//Interfaces & types
import { RBSheetRef } from "@/types"

//Tailwind
import tw from "twrnc"

//Assets
const searchIcon = require('./assets/search.png')
const filterIcon = require('./assets/filter_purple.png')
const backImage = require('./assets/btn_back.png')

//Context
import AppContext from "@/contexts";



export default function SearchList() {
	
	const refRBSheet = useRef<RBSheetRef>(null)
	
	const { 
		filterSpecie,
		setFilterSpecie,
		filterCharacters,
		setFilterCharacters,
		setTextSearch,
	} = useContext(AppContext)
	
	const [isDisabledButtonFilter, setIsDisabledButtonFilter] = useState(true)
	const [search, setSearch] = useState('')
	
	useEffect(() => {
		setIsDisabledButtonFilter(!(filterCharacters !== 'all' || filterSpecie !== 'all'))
	}, [filterCharacters, filterSpecie])


	return (
		<>
			<View style={styles.wrapInput}>
				<Image
					style={styles.searchIcon}
					source={searchIcon}
				/>
				<TextInput 
					keyboardType="web-search" 
					style={styles.input} 
					placeholder="Search or filter results" 
					onChangeText={(text) => {
						if(text) {
							setSearch(text.trim())
						}
					}}
					onBlur={() => {
						setTextSearch(search.trim())
					}}
				/>
				<TouchableOpacity
					onPress={() => refRBSheet.current?.open()}
				>
					<Image
						style={styles.searchIcon}
						source={filterIcon}
					/>
				</TouchableOpacity>
			</View>
			<RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
				height={Dimensions.get('screen').height*0.9}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
					container: {
						borderTopEndRadius: Radius.base,
						borderTopStartRadius: Radius.base,
						flexDirection: 'column',
					},
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
				
				<ThemedView style={tw`flex-1`}>
					{
						/**
						 * Heading
						 */
					}
					<View style={styles.filterModalHeader}>
						<TouchableOpacity onPress={() => {
							refRBSheet.current?.close()
						}}><Image style={styles.filterModalBack} source={backImage}/></TouchableOpacity>
						<ThemedText style={styles.filterModalTitle} type="subtitle">Filters</ThemedText>
					</View>
					
					<View style={styles.wrapGroups}>
						{
							/**
							 * Box filter characters
							 */
						}
						<GroupFilter
							style={styles.filterModalGroup}
							title="Characters"
							options={[
								{ id: 'all', label: 'All' },
								{ id: 'starred', label: 'Starred' },
								{ id: 'others', label: 'Others' },
							]}
							active="all"
							onChangeOption={(filter: string) => {
								setFilterCharacters(filter)
							}}
						/>
						{
							/**
							 * Box filter specie
							 */
						}
						<GroupFilter
							style={styles.filterModalGroup}
							title="Specie"
							options={[
								{ id: 'all', label: 'All' },
								{ id: 'human', label: 'Human' },
								{ id: 'others', label: 'Others' },
							]}
							active="all"
							onChangeOption={(filter: string) => {
								setFilterSpecie(filter)
							}}
						/>
					</View>
					<ThemedButton
						disabled={isDisabledButtonFilter}
						onPress={() => {
							refRBSheet.current?.close()
							router.push('/advanced_search')
						}}
						text="Filter"
					/>
				</ThemedView>
      </RBSheet>
		</>
	)
}


const styles = StyleSheet.create({
	wrapInput: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.grayBg,
		borderStyle: 'solid',
		backgroundColor: Colors.grayBg,
		paddingHorizontal: 10,
		flexDirection: 'row',
		height: 40,
		marginBottom: 20,
	},
	searchIcon: {
		resizeMode: 'contain',
		height: 40,
		width: 20,
	},
	input: {
		marginHorizontal: 10,
		flex: 1,
		height: 40,
		color: Colors.grayText,
	},
	
	
	
	filterModalHeader: {
		flexDirection: 'row',
		marginBottom: 25,
	},
	filterModalBack: {
		resizeMode: 'contain',
		height: 25,
		width: 30,
	},
	filterModalTitle: {
		textAlign: 'center',
		flex: 1,
	},
	wrapGroups: {
		flex: 1,
	},
	filterModalGroup: {
		marginBottom: 20,
	},
})