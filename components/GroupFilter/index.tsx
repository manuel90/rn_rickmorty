//React
import { useEffect, useState } from "react";

//RN components
import { StyleSheet, TouchableOpacity, View } from "react-native";

//Conponents
import ThemedText from "@/components/ThemedText";

//Interfaces & types
import { GroupFilterProps, ItemFilter } from "@/types";

//Constants
import { Radius, Colors } from "@/constants";


export default function GroupFilter({ title, options, active, style, onChangeOption = (newVal: string) => {} }: GroupFilterProps) {
	
	const [selected, setSelected] = useState(active)
	
	useEffect(() => {
		onChangeOption(selected)
	}, [selected])
	
	return (
		<>
			<View style={style}>
				<ThemedText style={styles.groupTitle}>{title}</ThemedText>
				<View style={styles.wrapOptions}>
					{
						options.map((item: ItemFilter, indexItemFilter: number) => (
							<TouchableOpacity 
								key={`indexItemFilter${indexItemFilter}`}
								style={StyleSheet.flatten([styles.itemFilter, item.id === selected ? styles.itemFilterActive : undefined])} 
								onPress={() => {
									setSelected(item.id)
								}}
							><ThemedText style={StyleSheet.flatten([styles.itemFilterText, item.id === selected ? styles.itemFilterActiveText : undefined])}>{item.label}</ThemedText></TouchableOpacity>
						))
					}
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	wrapGroup: {
		
	},
	groupTitle: {
		marginBottom: 10,
	},
	wrapOptions: {
		flexDirection: 'row',
		gap: 10,
	},
	itemFilter: {
		paddingVertical: 10,
		borderColor: Colors.borderGray,
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: Radius.base,
		flex: 1,
	},
	itemFilterText: {
		textAlign: 'center',
		fontWeight: 700,
	},
	itemFilterActive: {
		backgroundColor: Colors.purpleBg,
		borderColor: Colors.purpleBg,
	},
	itemFilterActiveText: {
		color: Colors.purple,
	},
})