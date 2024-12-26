//RN Hooks
import { useContext } from "react";

//RC components
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//Expo
import { Link } from "expo-router";

//Components
import HeartIcon from "@/components/HeartIcon";
import ThemedText from "@/components/ThemedText";

//Interfaces & types
import { ItemCharacterProps } from "@/types";

//Constans
import { Colors } from "@/constants";

//Tailwind
import tw from "twrnc";

//Context
import AppContext from "@/contexts";

export default function ItemCharacter({ character }: ItemCharacterProps) {
	
	
	const { 
		isFavorite,
		addFavorite, 
		removeFavorite, 
	} = useContext(AppContext)
	
	
	const hrefData = {
		pathname: '/single' as '/single',
		params: {
			characterJson: JSON.stringify({
				id: character.id,
				name: character.name,
				species: character.species,
				status: character.status,
				gender: character.gender,
				image: character.image,
			})
		}
	}
		
	return (
		<>
			<View>
				<View style={styles.innerCard}>
					<View style={styles.circleWrapImage}>
						<Link href={hrefData}>
							<Image
								style={styles.circleImage}
								source={{
									uri: character.image,
								}}
							/>
						</Link>
					</View>
					<View style={tw`flex-1 mx-4`}>
						<Link href={hrefData} numberOfLines={1}><ThemedText type="subtitle" numberOfLines={1}>{character.name}</ThemedText></Link>
						<ThemedText style={styles.specie} numberOfLines={1}>{character.species}</ThemedText>
					</View>
					<View style={styles.wrapButton}>
						<View style={styles.innerButton}>
							<TouchableOpacity
								onPress={() => {
									if(isFavorite(character.id)) {
										removeFavorite(character.id)
									} else {
										addFavorite(character.id)
									}
								}}
							>
								<HeartIcon
									style={styles.imageFavorite}
									type={isFavorite(character.id) ? 'fill' : 'empty'}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</>
	)
}


const styles = StyleSheet.create({
	circleWrapImage: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#fff',
		borderRadius: '50%',
		backgroundColor: '#fff',
		overflow: 'hidden',
		height: 50,
		width: 50,
	},
	
	circleImage: {
		resizeMode: 'cover',
		height: '100%',
		width: '100%',
	},
	
	innerCard: {
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: Colors.borderGray,
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		marginBottom: 10,
	},
	
	name: {
		color: '#000',
		fontSize: 18,
		lineHeight: 18,
		fontWeight: 700,
		marginBottom: 10,
	},
	
	wrapName: {
		marginLeft: 10,
		marginRight: 10,
	},
	
	wrapButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 44,
	},
	innerButton: {
		justifyContent: "center",
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#fff',
		borderRadius: '50%',
		backgroundColor: '#fff',
		overflow: 'hidden',
		height: 40,
		width: 40,
	},
	
	imageFavorite: {
		resizeMode: 'contain',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		width: '70%',
	},
	
	specie: {
		fontSize: 14,
		lineHeight: 14,
		fontWeight: 500,
		color: Colors.grayText,
	},
})