//RN components
import { StyleSheet, View, Image } from "react-native";

//Interfaces & types
import { RoundedImageProps } from "@/types";

export default function RoundedImage({ height, width, source }: RoundedImageProps) {
	return (
		<>
			<View style={StyleSheet.flatten([styles.circleWrapImage, { height, width }])}>
				<Image
					testID="imageCircle"
					style={styles.circleImage}
					source={source}
				/>
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
})