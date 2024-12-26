//RN components
import { StyleSheet, TouchableOpacity } from "react-native"

//Components
import ThemedText from "@/components/ThemedText"

//Interfaces & types
import { ThemedButtonProps } from "@/types"

//Constants
import { Colors, Radius } from "@/constants"

export default function ThemedButton({ text, disabled, ...otherProps }: ThemedButtonProps) {
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
		borderRadius: Radius.base,
		borderWidth: 1,
		borderColor: Colors.purple,
		borderStyle: 'solid',
		paddingVertical: 10,
		backgroundColor: Colors.purple,
	},
	buttonDisabled: {
		borderColor: Colors.grayDisabled,
		backgroundColor: Colors.grayDisabled,
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 700,
	},
	buttonDisabledText: {
		color: Colors.grayText,
	},
})