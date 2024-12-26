//RN components
import { Image, StyleSheet, TouchableOpacity } from "react-native";

//Hooks
import { useNavigation } from "expo-router";

//Assets
const backImage = require('./assets/btn_back.png')

export default function BackLeftButton() {
	useNavigation
	const navigation = useNavigation()

	return (
		<>
			<TouchableOpacity onPress={() => {
				if(navigation.canGoBack()) {
					navigation.goBack()
				}
			}}>
				<Image
					testID="backImage"
					style={styles.imageButton}
					source={backImage}
				/>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	imageButton: {
		resizeMode: 'contain',
		height: 25,
		width: 30,
	},
})