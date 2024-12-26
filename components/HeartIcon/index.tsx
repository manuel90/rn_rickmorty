//RC components
import { Image, StyleSheet } from "react-native";

//Interfaces & types
import { HeartIconProps } from "@/types";

//Assets
const favIcon = require('./assets/heart_green.jpg')
const notFavIcon = require('./assets/heart_gray.jpg')

export default function HeartIcon({ type, style }: HeartIconProps) {
	return (
		<>
			<Image
				style={StyleSheet.flatten([style])}
				source={type === 'fill' ? favIcon : notFavIcon}
			/>
		</>
	)
}