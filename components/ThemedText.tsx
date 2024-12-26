//RN Components
import { Text, StyleSheet } from "react-native"

//Interfaces & types
import { ThemedTextProps } from "@/types"

//Constants
import { Colors } from "@/constants"


export default function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {

  return (
    <Text
      testID="textElement"
      style={[
        { color: Colors.mainColor },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
