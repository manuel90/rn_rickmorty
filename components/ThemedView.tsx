//RN components
import { StyleSheet, View } from "react-native"

//Interfaces & types
import { ThemedViewProps } from "@/types"

//Tailwind
import tw from "twrnc"

//Constants
import { Colors } from "@/constants"


export default function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  return (
    <View style={tw.style(StyleSheet.flatten([{ backgroundColor: Colors.mainBackground }, style]) )}>
      <View style={tw.style('mx-6 my-8' , StyleSheet.flatten([{ backgroundColor: Colors.mainBackground }, style]) )} {...otherProps}/>
    </View>
  )
}
