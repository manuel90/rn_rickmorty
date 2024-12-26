//RN components
import { StyleSheet, View } from "react-native";

//Components
import ThemedText from "@/components/ThemedText";

//Constants
import { Colors } from "@/constants";

//Interfaces & types
import { ItemLabeledProps } from "@/types";

export default function ItemLabeled({ label, value }: ItemLabeledProps) {
	return (
		<>
			<View style={styles.wrapItemLabeled}>
				<ThemedText type="subtitle">{label}</ThemedText>
				<ThemedText style={styles.labelValue}>{ value }</ThemedText>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	wrapItemLabeled: {
		paddingVertical: 25,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: Colors.borderGray,
	},
	labelValue: {
		color: Colors.grayText,
	}
})