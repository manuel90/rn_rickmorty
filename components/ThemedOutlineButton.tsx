//RN components
import { StyleSheet, TouchableOpacity } from "react-native"

//Components
import ThemedText from "@/components/ThemedText"

//Interfaces & types
import { ThemedButtonProps } from "@/types"

//Constants
import { Colors } from "@/constants"

export default function ThemedOutlineButton({ text, disabled, ...otherProps }: ThemedButtonProps) {
	return (
		<>
			<TouchableOpacity
				style={StyleSheet.flatten([styles.button, disabled ? styles.buttonDisabled : undefined])}
				disabled={disabled}
				{...otherProps}
			><ThemedText style={StyleSheet.flatten([styles.buttonText, disabled ? styles.buttonDisabledText : undefined])}>{text}</ThemedText></TouchableOpacity>
		</>
	)
}



const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
	},
	buttonDisabled: {
	},
	buttonText: {
		color: Colors.purple,
		textAlign: 'center',
		fontWeight: 700,
	},
	buttonDisabledText: {
		color: Colors.grayText,
	},
})