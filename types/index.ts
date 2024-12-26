import { ImageStyle, type StyleProp, type TextProps, TouchableOpacityProps, type ViewProps, ViewStyle } from "react-native";
import { type Character, type Info } from "rickmortyapi";

export type StyleCompProp<T> = {
	style?: StyleProp<T>;
}


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type RaMLocation = {
	name: string;
	url: string;
}

export type ItemCharacterProps = {
	character: Character;
}

export type RoundedImageProps = {
	height: any;
	width: any;
	source: any;
}

export type ItemLabeledProps = {
	label: string;
	value: string;
}

export type HeartIconProps = StyleCompProp<ImageStyle> & {
	type: 'fill' | 'empty';
}

export type CharacterPreview = Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'image'>

export type ItemFilter = {
	id: string;
	label: string;
}

export type GroupFilterProps = StyleCompProp<ViewStyle> & {
	title: string;
	options: ItemFilter[];
	active: string;
	onChangeOption?: Function;
}

export type ThemedButtonProps = TouchableOpacityProps & {
	text: string;
}

export type ListCharactersProps = {
	characters: Character[];
	isLoading: boolean;
	showResults?: boolean;
	showLoadingAtEnd?: boolean;
	showSort?: boolean;
}

export type RBSheetRef = {
	open: () => {},
	close: () => {},
}