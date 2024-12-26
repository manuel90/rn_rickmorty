//React
import { useContext } from "react"

//Expo
import { Stack } from "expo-router"

//RN components
import { ScrollView, SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native"

//Hooks
import { useLocalSearchParams } from "expo-router"

//Components
import ThemedText from "@/components/ThemedText"
import ThemedView from "@/components/ThemedView"
import RoundedImage from "@/components/RoundedImage"
import ItemLabeled from "@/components/ItemLabeled"
import HeartIcon from "@/components/HeartIcon"
import BackLeftButton from "@/components/BackLeftButton"

//Interfaces & types
import { CharacterPreview } from "@/types"

//Tailwind
import tw from "twrnc"

//Context
import AppContext from "@/contexts"

export default function Single() {

	const { characterJson } = useLocalSearchParams();
	
	if(characterJson instanceof Array) {
		throw new Error("Invalid character data.")
	}
	
	const myCharacterPreview: CharacterPreview = JSON.parse(characterJson) 
	
	const { 
		isFavorite,
		addFavorite, 
		removeFavorite, 
	} = useContext(AppContext)
	
  return (
    <ThemedView style={tw`flex-1`}>
			<ScrollView>
        <SafeAreaView>
					<Stack.Screen
						options={{
							headerLeft: () => <BackLeftButton />,
							headerTitle: () => '',
						}}
					/>
					<View style={styles.wrapImage}>
						<RoundedImage height={100} width={100} source={{ uri: myCharacterPreview.image }} />
						<View
							style={styles.wrapHeart}
						>
							<TouchableOpacity
							style={styles.touchHeart}
								onPress={() => {
									if(isFavorite(myCharacterPreview.id)) {
										removeFavorite(myCharacterPreview.id)
									} else {
										addFavorite(myCharacterPreview.id)
									}
								}}
							>
								<HeartIcon
									style={styles.heart}
									type={ isFavorite(myCharacterPreview.id) ? 'fill' : 'empty' }
								/>
							</TouchableOpacity>
						</View>
					</View>
          <ThemedText style={styles.name}>{myCharacterPreview.name}</ThemedText>
					<ItemLabeled label="Specie" value={myCharacterPreview.species} />
					<ItemLabeled label="Status" value={myCharacterPreview.status} />
					<ItemLabeled label="Gender" value={myCharacterPreview.gender} />
        </SafeAreaView>
			</ScrollView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
	wrapImage: {
		position: 'relative',
		marginBottom: 20,
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
	
	name: {
		fontSize: 30,
		lineHeight: 33,
		fontWeight: 700,
	},
})
